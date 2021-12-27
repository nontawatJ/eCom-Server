import errorRes from '../utils/errorRes.js';

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    if (err.code === 11000) {
        const message = "duplicate field value enter";
        error = new errorRes(message,400);
    }
    if (err.name === "validationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new errorRes(message,400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "server error"
    });

};

export default errorHandler;