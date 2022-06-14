const {
    sendResponse,
    validPaths,
    checkRoute,
    routeIsValid,
    specifyDependencyRelatedToTheController
} = require("../utility/utility");

const validation = require("../validation/Validation");
const {ResponseStatusCodes, ResponseMessages, ResponseStatus} = require("../utility/responseConfigs");


class BaseHandler {
    #nextHandler;

    handle(request, response, routes, servicesInstances) {
        if (this.#nextHandler) {
            return this.#nextHandler.handle(
                request,
                response,
                routes,
                servicesInstances
            );
        } else {
            const validRoutesAndMethods = validPaths(request.pathName, routes);
            const incomingRequestUrlandMethod = checkRoute(request);
            const validRoute = routeIsValid(
                validRoutesAndMethods,
                incomingRequestUrlandMethod
            );

            // specify dependency related to the controller
            const instances=specifyDependencyRelatedToTheController(routes,servicesInstances,incomingRequestUrlandMethod)

            // validation payload or query string
            if (request.method === 'POST' || request.method === "PUT") validation.bodyValidation(request.payload)

            if (validRoute) {
                validRoute.controller.controller
                    .getInstance(instances)
                    [validRoute.handler](request, response, validation.validationErrors);
            } else {
                sendResponse(response, ResponseStatusCodes.NOTFOUND, ResponseMessages.NOTFOUND, ResponseStatus.NOT_FOUND);
            }
        }
    }

    setNext(handler) {
        this.#nextHandler = handler;
        return handler;
    }
}

module.exports = BaseHandler;
