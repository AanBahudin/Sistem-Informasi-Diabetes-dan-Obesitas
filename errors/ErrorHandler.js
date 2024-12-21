import { StatusCodes } from "http-status-codes";

const ErrorHandler = (err, req, res, next) => {
    console.log(err.msg);

    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const message = err.message || "Something went wrong"

    res.json({msg: message, statusCode})
}

export default ErrorHandler