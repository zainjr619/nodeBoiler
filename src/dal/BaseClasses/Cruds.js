class Cruds {
  constructor(Model) {
    this.Model = Model;
  }

  async create(params) {
    return this.Model.create((params));
  }

  static createBulk(paramsArr) {
    const modelObj = [];
    paramsArr.forEach((element) => {
      modelObj.push(new this.Model(element));
    });
    return this.Model.insertMany(modelObj);
  }

  // async find(params = {}) {
  //   return this.Model.find(params);
  // }

  async findOne(params = {}) {
    return this.Model.findOne({ raw: true, where: params });
  }

  async findOneWithRelation(params = {}, include = {}, attributes) {
    return this.Model.findOne({
      nest: true, raw: true, where: params, include, attributes,
    });
  }

  async findOneWithManyRelations(params = {}, include = {}, attributes) {
    return this.Model.findOne({
      nest: true, where: params, include, attributes,
    });
  }

  async findAll(params) {
    return this.Model.findAll({ raw: true, ...params });
  }

  async findAllWithRelation(params = {}, include = {}, attributes) {
    return this.Model.findAll({
      nest: true, raw: true, where: params, include, attributes,
    });
  }

  async findById(id) {
    return this.Model.findByPk(id, { raw: true });
  }

  async deleteById(id) {
    return this.Model.deleteOne({ id });
  }

  async deleteByUserId(id, userId) {
    return this.Model.deleteOne({ raw: true, where: { id, userId } });
  }

  async updateById(id, params = {}) {
    return this.Model.update(params, { where: { id } });
  }

  async updateByUserId(userId, params = {}) {
    return this.Model.update(params, { where: { userId } });
  }

  async updateByIdAndUserId(id, userId, params = {}) {
    return this.Model.update(params, { where: { id, userId } });
  }

  async findByUserId(userId) {
    return this.Model.findOne({ raw: true, where: { userId } });
  }

  async findOrCreate(params) {
    return this.Model.findOrCreate({ raw: true, ...params });
  }
  async updateOrCreate(userId, params = {}) {
    return this.Model.upsert(params, { where: { userId } });
  }
  async destroy(params) {
    return this.Model.destroy({ raw: true, ...params });
  }
  async count(params ) {
    return this.Model.count({ raw: true,...params });
  }
  async update(updates, query) {
    return this.Model.update(updates, query);
  }
}

module.exports = Cruds;
