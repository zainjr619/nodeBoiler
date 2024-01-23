const { userdal} = require("../dal");
const P2PClient = require('../service/external/p2p-client')
const CustomError = require('../utils/error');
const { ERROR_CODES } = require('../constant');
const config = require('../common/config')
class UserService {
  static async registerUser(req) {
   await P2PClient.validatePrivateKey(req.headers, req.body.user_id);
   const appUser= await userdal.findAll({ where: { fassetId: req.body.user_id} });
   if(appUser?.length>0){
    return { usercreated: false,userData:appUser };
  }
   let resp= await userdal.findOrCreate({
    where: {
       fassetId : req.body.user_id,
       userName: req.body.username
      }, 
    defaults: { 
      countryCode: req.body.country_code, }})
    if(resp)    {
    return { usercreated: true,userData:resp[0] };
    }
    return { usercreated: false,userData:resp[0] };

  }
}
module.exports = UserService;