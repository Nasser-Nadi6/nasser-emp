const {ResponseStatusCodes, ResponseMessages, ResponseStatus} = require("../utility/responseConfigs");

class Validation {
    validationErrors = [];

    bodyValidation(body) {
        let validationFlag
        this.validationErrors = []
        const {id, data, parentId} = body;
        if (!id || !data || !parentId) {
            this.validationErrors.push({
                statusCode: ResponseStatusCodes.BAD_REQUEST,
                message: ResponseMessages.MissingRequiredFields,
                status: ResponseStatus.BAD_REQUEST
            })
        }
        if (typeof id !== 'number' || typeof parentId !== 'number') {
            this.validationErrors.push({
                statusCode: ResponseStatusCodes.BAD_REQUEST,
                message: ResponseMessages.TYPE_ERROR,
                status: ResponseStatus.VALIDATION_ERROR
            })
        }
        const allowedKeys = ['id', 'data', 'parentId']
        const bodyKeys = Object.keys(body)
        validationFlag = bodyKeys.every((key) => {
            return allowedKeys.includes(key)
        })
        if (!validationFlag) {
            this.validationErrors.push({
                statusCode: ResponseStatusCodes.BAD_REQUEST,
                message: ResponseMessages.NOT_ALLOWED,
                status: ResponseStatus.VALIDATION_ERROR
            })
        }
    }

    // isEmail(email) {
    //     const emailPattern = /[a-zA-Z0-9.+-]+@[a-zA-Z]+\.[a-zA-Z]+/;
    //     if (!emailPattern.test(email)) {
    //         this.validationErrors.push({
    //             statusCode: ResponseStatusCodes.BAD_REQUEST,
    //             message: ResponseMessages.InvalidEmail,
    //             status: ResponseStatus.BAD_REQUEST
    //         })
    //     }
    // }

    queryValidation(query) {

    }
}

module.exports = new Validation();
