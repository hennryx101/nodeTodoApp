const errorHandler = require("./errorHandler");

const asyncFunction = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            const errors = errorHandler(error);
            res.status(400).json({ errors });
        }
    }
}

module.exports = asyncFunction;