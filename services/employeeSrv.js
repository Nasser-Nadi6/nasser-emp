const ParentRepository = require("../Repositories/ParentRepository");
const EmployeeRepository = require("../Repositories/EmployeeRepository");
const { isEmpty, userExist } = require("../utility/utility");
const {injectToDI,useDependency}=require("../decorators/decorators")

@injectToDI('EmployeeSrv')
@useDependency('EmployeeRepository')
class EmployeeSrv {
  static instance

  async add(id, data, parentId) {
    // Check if employeeId is already exist
    const employee = await EmployeeRepository.get(id);
    if (userExist(employee)) {
      return employee;
    }
    // employee does not exist
    const result = await Promise.all([
      EmployeeRepository.insert(id, data),
      ParentRepository.insert(id, parentId),
    ]);
    return result;
  }

  async get(id) {
    const result = await Promise.all([
      EmployeeRepository.get(id),
      ParentRepository.get(id),
    ]);
    return {
      data: result[0],
      parentId: result[1],
    };
  }

  async update(id, data, parentId) {
    // Check if employeeId is exist
    const employee = await EmployeeRepository.get(id);
    if (!userExist(employee)) {
      return employee;
    }
    const result = await Promise.all([
      EmployeeRepository.insert(id, data),
      ParentRepository.insert(id, parentId),
    ]);
    return result;
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    return (this.instance = new EmployeeSrv());
  }
}

module.exports = EmployeeSrv;
