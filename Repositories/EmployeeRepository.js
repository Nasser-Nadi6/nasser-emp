const {injectToDI}=require('../decorators/decorators')

@injectToDI('EmployeeRepository')
class EmployeeRepository {
  redis;
  static instance;

  constructor() {}

  static async insert(id, data) {
    const result = await this.redis.hmset(id, data);
    return result;
  }

  static async get(id) {
    const result = await this.redis.hgetall(id);
    return result;
  }

  // Singleton design pattern
  static getInstance(redis) {
    this.redis = redis;
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new EmployeeRepository());
  }
}

module.exports = EmployeeRepository;
