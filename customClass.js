class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ServiceReturn {
    constructor(message, status, result) {
        this.status = status;
        this.message = message;
        this.result = result;
    }
}

module.exports = { CustomError, ServiceReturn };
