const convertToStream = require('into-stream');
const { v1: uuidv1 } = require('uuid');
const AWS = require('aws-sdk'); // import entire SDK
const logger = require('./logger');
const config = require('./config');
const http = require('./http');
const sharp = require('sharp');
const fs = require('fs');

const s3 = new AWS.S3({
  endpoint: config.awsS3Endpoint,
  signatureVersion: 'v4'
});

class S3Uploader {

  static getExtension(originalName) {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(originalName)[1];
    return ext;
  }

  static upload(file, folderName) { 
    return new Promise((resolve, reject) => {
      if(Object?.keys(file.buffer).length===2){
       file.buffer=Buffer.from(file.buffer?.data);
      }
      const fileStream = convertToStream(file.buffer);
      const originalName = file.originalname;
      const ext = this.getExtension(originalName);
      const blobName = folderName
        ? `${folderName}/${uuidv1()}.${ext}`
        : `${uuidv1()}.${ext}`;
      s3.upload({ Bucket: `${config.s3BucketName}`, Key: blobName, Body: fileStream }, (err, data) => {
        if (err) {
          logger.error(`${err} , ${folderName}`);
          reject(err);
        } if (data) {
          logger.info(`Document was uploaded successfully. url: ${data.Key}`);
          resolve(data);
        }
      });
    });
  }

  static uploadHistory(file, folderName) {
    return new Promise((resolve, reject) => {
      const fileStream = convertToStream(file);
      const blobName = folderName
        ? `${folderName}/${uuidv1()}.pdf`
        : `${uuidv1()}.pdf`;
      s3.upload({ Bucket: `${config.s3BucketName}`, Key: blobName, Body: fileStream }, (err, data) => {
        if (err) {
          logger.error(`${err} , ${folderName}`);
          reject(err);
        } if (data) {
          logger.info(`Document was uploaded successfully. url: ${data.key}`);
          resolve(data);
        }
      });
    });
  }

  static uploadJumioFile(file, folderName) {
    file = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    folderName = `${folderName}/${uuidv1()}`;
    return new Promise((resolve, reject) => {
      s3.upload({
        Bucket: `${config.s3BucketName}`, Key: folderName, Body: file, ContentEncoding: 'base64', ContentType: 'image/jpeg',
      }, (err, data) => {
        if (err) {
          logger.error(`${err} , ${folderName}`);
          reject(err);
        } if (data) {
          logger.info(`Document was uploaded successfully. url: ${data}`);
          resolve(data);
        }
      });
    });
  }

  static getPresignedUrl(Key) {
    return new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', { Bucket: `${config.s3BucketName}`, Key }, (err, data) => {
        if (err) {
          logger.error(`signing s3Url : ${err} , ${Key}`);
          reject(err);
        } if (data) {
          logger.info('successfully generated signed Url');
          resolve(data);
        }
      });
    });
  }
  
  static delete(KeyOb) {
    return new Promise((resolve, reject) => {
      s3.deleteObject({ Bucket: `${config.s3BucketName}`,  Key: KeyOb }, (err, data) => {
        if (err) {
          logger.error(`error to delete object: ${err} , ${KeyOb}`);
          reject(err);
        } if (data) {
          logger.info('successfully delete object');
          resolve(data);
        }
      });
    });
  }


// static uploadToCFImages(file, folderName) {
//   return new Promise((resolve, reject) => {
//     if(Object?.keys(file.buffer).length===2){
//       file.buffer=Buffer.from(file.buffer?.data);
//     }
//     const fileStream = convertToStream(file.buffer);
//     const originalName = file.originalname;
//     const ext = this.getExtension(originalName);
//     const blobName = folderName
//       ? `${folderName}/${uuidv1()}.${ext}`
//       : `${uuidv1()}.${ext}`;
//    const url = config.cloudFlareUrl;
//    const apiToken= config.cloudFlareKey
//    const headers = {
//      Authorization: `Bearer ${apiToken}`
//     };
//    const data = new FormData();
//    data.append('file', fileStream, blobName);

//     http.postRequest(data, url, { headers })
//     .then(response => {
//       resolve(response);
//     })
//     .catch(error => {
//       console.log(error);
//       reject(error);
//     });
//   });
// }

 static async resizeAndUploadImage(file) {
  try {
    const targetFileSizeInBytes = `${config.postMaxUploadSize}`  * 1024 * 1024;
    if (targetFileSizeInBytes > 2) {
      const resizedImageBuffer = await sharp(file.path)
        .resize({ width: 800, height: 600 })
        .withMetadata(false)
        .toBuffer();  

        let quality = 90;
        let compressedImageBuffer = resizedImageBuffer;

        while (compressedImageBuffer.length > targetFileSizeInBytes && quality >= 10) {
            compressedImageBuffer = await sharp(resizedImageBuffer)
            .jpeg({ quality })
            .toBuffer();
          quality -= 5;
        }
       fs.unlink(file.path,(err,res)=>{});
       const SizeImage = Math.round(compressedImageBuffer.length / 1024);
       file.size=SizeImage;
       file.buffer=compressedImageBuffer;;
      return file;
    }
    else{
       const imageWithoutMetadataBuffer = await sharp(file.path)
       .withMetadata(false)
       .toBuffer(); 

      fs.unlink(file.path,(err,res)=>{}); 
       file.buffer=imageWithoutMetadataBuffer;
       return file;
    }
  } catch (error) {
    console.error('Error resizing image:', error);
    return error;
  }
 };
}

module.exports = S3Uploader;