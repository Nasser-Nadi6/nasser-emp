const ResponseStatusCodes = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
});

const ResponseMessages = Object.freeze({
  EmployeeExist: "employee id is already exist.",
  SuccessfullyStored: "Data stored successfully.",
  MissingRequiredFields:
    "Missing required field(s)-(id,data and parentId are required!)",
  InvalidEmail: "Email is invalid",
  NOTFOUND: "Resource not found",
  TYPE_ERROR: "id and parentId must be number.",
  NOT_ALLOWED: "Additional properties not allowed.",
  ID_NOT_PROVIDE: "id not provided",
  USER_NOT_FOUND: "user with this id not found.",
  PROPERTY_NOT_PROVIDE: "parentId or id does not exist",
  SUCCESSFULLY_UPDATE: "Information updated successfully.",
  INTERNAL_SERVER_ERROR: "Something went wrong.please try again later.",
  SUCCESSFULLY_FETCHED: "Information fetched successfully.",
  DATA_TYPE_ERROR: "data must be an object.",
});

const ResponseStatus = Object.freeze({
  OK: "Success",
  ERROR: "Error",
  BAD_REQUEST: "Bad_Request",
  NOT_FOUND: "Not_Found",
  VALIDATION_ERROR: "Validation_Error",
});

module.exports = {
  ResponseStatusCodes,
  ResponseMessages,
  ResponseStatus,
};
