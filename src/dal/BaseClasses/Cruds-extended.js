/**
 * Extended cruds example
 */
const Cruds = require('./Cruds');

class ExtendedCruds extends Cruds {
  activate(id) {
    this.updateById(id, { is_active: true });
  }

  deActivate(id) {
    this.updateById(id, { is_active: false });
  }
}

module.exports = ExtendedCruds;
