const ERRORS = {
    BAD_DATA: {
        symbol: Symbol("BAD_DATA"),
        err_code: 0,
        err_msg: "malformed request"
    },
    ALREADY_AUTHORIZED: {
        symbol: Symbol("ALREADY_AUTHORIZED"),
        err_code: 2,
        err_msg: "The client is already logged in"
    },
    WRONG_PASSWORD_OR_USERNAME: {
        symbol: Symbol("WRONG_PASSWORD_OR_USERNAME"),
        err_code: 3,
        err_msg: "WRONG_PASSWORD_OR_USERNAME"
    },
    ALREADY_HAS_EMAIL: {
        symbol: Symbol("ALREADY_HAS_EMAIL"),
        err_code: 5,
        err_msg: "user already has EMAIL"
    },
    EMAIL_NOT_FOUND: {
        symbol: Symbol("EMAIL_NOT_FOUND"),
        err_code: 6,
        err_msg: "user's email not found"
    },
    HAS_TO_BE_GREATER_THAN_ZERO: {
        symbol: Symbol("HAS_TO_BE_GREATER_THAN_ZERO"),
        err_code: 10,
        err_msg: "Has to be greater than zero"
    },
    UNAUTHORIZED_ACCESS: {
        symbol: Symbol("UNAUTHORIZED_ACCESS"),
        err_code: 401,
        err_msg: "UNAUTHORIZED ACCESS"
    },
    FORBIDDEN: {
        symbol: Symbol("FORBIDDEN"),
        err_code: 403,
        err_msg: "Forbidden"
    },
};

module.exports = {ERRORS}