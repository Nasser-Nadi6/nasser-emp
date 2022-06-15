const BaseController = require("./Base-Controller/BaseController");
const {
    useDependency,
    controller,
    method,
    path
} = require("../decorators/decorators");

const {sendResponse, userExist} = require("../utility/utility");
const {
    ResponseStatusCodes,
    ResponseMessages,
    ResponseStatus,
} = require("../utility/responseConfigs");
const CustomError = require("../utility/CustomError");

@controller("/dataService")
@useDependency(["EmployeeSrv"])
class EmployeeController extends BaseController {
    static instance;
    employeeSrv;

    constructor(services) {
        super();
        console.log(services);
        this.employeeSrv = services[0].instance;
    }

    @method("POST")
    @path("/add")
    async addEmployee(req, res, validationResult) {
        try {
            if (validationResult.length) throw new CustomError(ResponseStatusCodes.BAD_REQUEST, validationResult, ResponseStatus.BAD_REQUEST);
            const {id, data, parentId} = req.payload;
            const employee = await this.employeeSrv.add(id, data, parentId);
            if (userExist(employee)) throw new CustomError(ResponseStatusCodes.BAD_REQUEST, ResponseMessages.EmployeeExist, ResponseStatus.BAD_REQUEST);
            return sendResponse(res, ResponseStatusCodes.CREATED, ResponseMessages.SuccessfullyStored, ResponseStatus.OK
            );
        } catch (error) {
            sendResponse(res, error.statusCode, error.msg, error.status);
        }
    }

    @method("GET")
    @path("/get")
    async getEmployeeInfoById(req, res) {
        try {
            const id = req.query.id;
            if (!id)
                throw new CustomError(ResponseStatusCodes.BAD_REQUEST, ResponseMessages.ID_NOT_PROVIDE, ResponseStatus.ERROR);
            const result = await this.employeeSrv.get(id);
            if (!result.data || !result.parentId)
                throw new CustomError(ResponseStatusCodes.NOTFOUND, ResponseMessages.USER_NOT_FOUND, ResponseStatus.NOT_FOUND);
            sendResponse(res, ResponseStatusCodes.OK, ResponseMessages.SUCCESSFULLY_FETCHED, ResponseStatus.OK,result
            );
        } catch (error) {
            sendResponse(res, error.statusCode, error.msg, error.status);
        }
    }

    @method("PUT")
    @path("/update")
    async updateEmployeeInfo(req, res, validationResult) {
        try {
            const {id, data, parentId} = req.payload;
            if (validationResult.length) throw new CustomError(ResponseStatusCodes.BAD_REQUEST, validationResult, ResponseStatus.BAD_REQUEST);
            // check if user with this id is exist
            const employee = await this.employeeSrv.get(id);
            if (!userExist(employee.data))
                throw new CustomError(ResponseStatusCodes.NOTFOUND,ResponseMessages.USER_NOT_FOUND, ResponseStatus.NOT_FOUND);

            // check if data's properties is valid
            const dataKeys = Object.keys(employee.data);
            const newDataKeys = Object.keys(data);

            const validDataFlag = newDataKeys.every((el) => {
                return dataKeys.includes(el);
            });

            //if user exist and data's properties are valid, we update user info
            if (validDataFlag) {
                await this.employeeSrv.update(id, data, parentId);
                sendResponse(res, ResponseStatusCodes.OK, ResponseMessages.SUCCESSFULLY_UPDATE,ResponseStatus.OK);
            } else {
                throw new CustomError(ResponseStatusCodes.BAD_REQUEST, ResponseMessages.NOT_ALLOWED,ResponseStatus.BAD_REQUEST);
            }
        } catch (error) {
            sendResponse(res, error.statusCode, error.msg, error.status);
        }
    }

    static getInstance(services) {
        if (this.instance) {
            return this.instance;
        }

        return (this.instance = new EmployeeController(services));
    }
}

module.exports = EmployeeController;
