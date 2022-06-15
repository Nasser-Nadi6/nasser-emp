const {
  ResponseStatusCodes,
  ResponseMessages,
  ResponseStatus,
} = require("../utility/responseConfigs");

class Validation {
  validationErrors = [];

  bodyValidation(body) {
    let validationFlag;
    this.validationErrors = [];
    const { id, data, parentId } = body;
    if (!id || !data || !parentId) {
      this.validationErrors.push(ResponseMessages.MissingRequiredFields);
    } else {
      this.validationErrors = this.validationErrors.filter((el) => {
        return el !== ResponseMessages.MissingRequiredFields;
      });
    }

    if (typeof data !== "object") {
      this.validationErrors.push(ResponseMessages.DATA_TYPE_ERROR);
    } else {
      this.validationErrors = this.validationErrors.filter((el) => {
        return el !== ResponseMessages.DATA_TYPE_ERROR;
      });
    }
    if (typeof id !== "number" || typeof parentId !== "number") {
      this.validationErrors.push(ResponseMessages.TYPE_ERROR);
    } else {
      this.validationErrors = this.validationErrors.filter((el) => {
        return el !== ResponseMessages.TYPE_ERROR;
      });
    }
    const allowedKeys = ["id", "data", "parentId"];
    const bodyKeys = Object.keys(body);
    validationFlag = bodyKeys.every((key) => {
      return allowedKeys.includes(key);
    });
    if (!validationFlag) {
      this.validationErrors.push(ResponseMessages.NOT_ALLOWED);
    } else {
      this.validationErrors = this.validationErrors.filter((el) => {
        return el !== ResponseMessages.NOT_ALLOWED;
      });
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

  queryValidation(query) {}
}

module.exports = new Validation();
