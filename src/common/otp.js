// class OtpCommon {
//   static rand(min, max) {
//     const random = Math.random();
//     return Math.floor(random * (max - min) + min);
//   }

//   static generateOtpCode(length) {
//     const digits = '0123456789';
//     let otpCode = '';
//     for (let index = 0; index < length; index += 1) {
//       const charIndex = this.rand(0, digits.length - 1);
//       otpCode += digits[charIndex];
//     }

//     return otpCode;
//   }
// }
// module.exports = OtpCommon;
