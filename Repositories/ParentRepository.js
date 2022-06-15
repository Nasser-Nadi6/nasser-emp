const {injectToDI}=require('../decorators/decorators')

@injectToDI('EmployeeRepository')
class ParentRepository {
  redis;
  static instance;

  constructor() {}

  static async insert(id, parentId) {
    const result = await this.redis.set(id, parentId);
    return result;
  }

  static async get(id) {
    const parentId = await this.redis.get(id);
    return parentId;
  }

  // Singleton design pattern
  static getInstance(redis) {
    this.redis = redis;
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new ParentRepository());
  }
}

module.exports = ParentRepository;
