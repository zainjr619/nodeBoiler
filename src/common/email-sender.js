// const sgMail = require('@sendgrid/mail');
// const config = require('./config');
// const logger = require('./logger');

// if (config.sendGrid.enable) {
//   sgMail.setApiKey(config.sendGrid.mailKey);
// }

// class EmailSender {
//   static async sendEmail(
//     emailBody,
//     to,
//     subject = 'Fasset',
//     from = config.emails.formSubmissionFromEmail,
//   ) {
//     if (config.sendGrid.enable) {
//       try {
//         const sentInfo = await sgMail.send({
//           to,
//           from,
//           subject,
//           html: `<p>${emailBody}</p>`,
//         });
//         logger.info(
//           `Email sent successfully to: ${to}, subject: ${subject}, type: ${emailBody}`,
//         );
//         return !!sentInfo;
//       } catch (error) {
//         logger.log(
//           'error',
//           `Error occurred while sending email type: ${emailBody}, to: ${to}, subject: ${subject}`,
//           { meta: { emailBody, error: error.stack } },
//         );
//       }
//       return false;
//     }
//     return true;
//   }
// }

// module.exports = EmailSender;
