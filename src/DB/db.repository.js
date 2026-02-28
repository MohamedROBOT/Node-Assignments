import User from "./models/user/user.model.js";
class DBRepository {
  nModel;
  constructor(model) {
    this.nModel = model;
  }

  async create(item) {
    return await this.nModel.create(item);
  }

  async getOne(filter, projection, options = {}) {
    return await this.nModel.findOne(filter, projection, options);
  }
async getMany(filter, projection, options = {},skip,limit,sort) {
    return await this.nModel.find(filter, projection, options).sort(sort).skip(skip).limit(limit);
}
  async update(filter, update, options = {}) {
    return await this.nModel.findOneAndUpdate(filter, update, options);
  }
async updateMany(filter, update, options = {}) {
    return await this.nModel.updateMany(filter, update, options);
}
  async getAndReplace(filter, replacement, options = {}) {
    return await this.nModel.findOneAndReplace(filter, replacement, options);
  }

  async deleteMany(filter){
    return await this.nModel.deleteMany(filter)
  }

  async deleteById(id) {
    return await this.nModel.findByIdAndDelete(id);
  }

  async aggregate(pipeline){
    return await this.nModel.aggregate(pipeline)
  }
}
export default DBRepository;
