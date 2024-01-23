const { Cruds } = require('./BaseClasses');
const {comment , reaction, user,post} = require('../models')
class UserDal extends Cruds {
    constructor(Model) {
      super(Model);
      this.Model = Model;
      this.associations();
    }
    associations() {

    }
}
module.exports = new UserDal(user);