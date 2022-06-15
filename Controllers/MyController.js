const BaseController = require("./Base-Controller/BaseController");
const { controller, method, path,useDependency,name } = require("../decorators/decorators");

@controller("/mycontroller")
@useDependency(["EmployeeSrv","TodoService"])
class MyController extends BaseController {
  static instance;
  todoService;
  empSrv

  constructor(services) {
    super();
    console.log('--- from my controller')
    console.log(services)
    console.log(services[0]?.instance)
    // this.todoService = services[0].instance;
  }

  @method("GET")
  @path("/myPath")
  firstMethod() {
    // this.todoService.add();
  }

  static getInstance(services) {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new MyController(services));
  }
}

module.exports = MyController;
