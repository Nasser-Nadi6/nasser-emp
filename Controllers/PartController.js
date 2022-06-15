const {controller, useDependency, method, path} = require("../decorators/decorators")
const BaseController = require("./Base-Controller/BaseController")

@controller('/app')
@useDependency(['EmployeeSrv', "TodoService"])
class PartController extends BaseController {
    static instance;

    constructor(services) {
        super();
        console.log(services)
    }

    @method("GET")
    @path("")
    firstMethod(req, res) {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end("FROM PART CONTROLLER")
    }

    static getInstance(services) {
        if (this.instance) {
            return this.instance;
        }
        return (this.instance = new PartController(services));
    }
}


module.exports = PartController