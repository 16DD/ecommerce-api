const StatusCodes = require("../utils/statusCodes");
const ReasonStatusCodes = require("../utils/reasonPhrases");

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCodes.CONFLICT, status = StatusCodes.CONFLICT) {
        super(message, status);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCodes.FORBIDDEN, status = StatusCodes.FORBIDDEN) {
        super(message, status);
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(message = ReasonStatusCodes.UNAUTHORIZED, status = StatusCodes.UNAUTHORIZED) {
        super(message, status);
    }
}

module.exports = {
    ErrorResponse,
    ConflictRequestError,
    BadRequestError,
    AuthFailureError
};
