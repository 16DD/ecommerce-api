const StatusCodes = require("../utils/statusCodes");
const ReasonStatusCodes = require("../utils/reasonPhrases");

class SuccessResponse {
    constructor({ message, statusCode = StatusCodes.OK, reasonStatusCode = ReasonStatusCodes.OK, metadata = {} }) {
        this.message = message ? message : reasonStatusCode;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata });
    }
}

class CREATED extends SuccessResponse {
    constructor({ options = {}, message, statusCode = StatusCodes.CREATED, reasonStatusCode = ReasonStatusCodes.CREATED, metadata }) {
        super({ message, statusCode, reasonStatusCode, metadata });
        this.options = options;
    }
}

module.exports = {
    SuccessResponse,
    OK,
    CREATED
};
