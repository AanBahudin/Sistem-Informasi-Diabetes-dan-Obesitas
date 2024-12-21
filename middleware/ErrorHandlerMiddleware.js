import { StatusCodes } from 'http-status-codes'


export class BadRequestError extends Error {
    constructor(message) {
        super(message)
        this.message = message
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.message = message
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export class NotAuthenticatedError extends Error {
    constructor(message) {
        super(message)
        this.message = message
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export class UnathorizedError extends Error {
    constructor(message) {
        super(message)
        this.message = message
        this.statusCode = StatusCodes.FORBIDDEN
    }
}