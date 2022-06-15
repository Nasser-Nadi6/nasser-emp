require("dotenv").config();
const {loadAllControllers} = require("./loader/controllersLoader");
const server = require("./Server");
const Router = require("./router/Router");
const {initControllers, connectToDB} = require("./utility/init");
const EmployeeController = require("./Controllers/EmployeeController");
const DIContainer = require("./DiContainer/DIContainer");
const MyController = require("./Controllers/MyController");
const EmployeeRepository = require("./Repositories/EmployeeRepository");
const ParentRepository = require("./Repositories/ParentRepository");
const EmployeeSrv = require("./services/employeeSrv");
const TodoService = require("./services/TodoService");
const PartController = require('./Controllers/PartController')

async function app() {
    // const controllers=loadAllControllers()
    // console.log(controllers)
    const routes = initControllers([
        {
            controller: EmployeeController,
            handlers: ["addEmployee", "getEmployeeInfoById", "updateEmployeeInfo"],
        },
        {controller: MyController, handlers: ["firstMethod"]},
        {controller: PartController, handlers: ["firstMethod"]}
    ]);

    const di = new DIContainer([
        {name: "EmployeeSrv", class: EmployeeSrv},
        {name: "TodoService", class: TodoService},
    ], [{name: "EmployeeRepository", class: EmployeeRepository}, {name: "ParentRepository", class: ParentRepository}]);

    const employeeRedisConnector = await connectToDB(process.env.DB_PORT, 0);
    const parentRedisConnector = await connectToDB(process.env.DB_PORT, 1);
    EmployeeRepository.getInstance(employeeRedisConnector);
    ParentRepository.getInstance(parentRedisConnector);
    new Router(routes, di.singletonInstances);
    server.start();
    server.listen(process.env.PORT);
}

app();
