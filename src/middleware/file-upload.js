const multer = require('multer');
const path = require('path')
const config = require('../common/config')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(process.cwd(),"/temp"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext=file.mimetype.replace("image/",".")
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
});

module.exports = {
  memUpload: multer({ storage, limits: { fileSize: `${config.postMaxUploadSize}` * 1024 * 1024 }}),
};