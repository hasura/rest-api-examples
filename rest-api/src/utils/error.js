"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleErrors = exports.NotFoundError = void 0;
const pg_1 = require("pg");
const tsoa_1 = require("tsoa");
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
function HandleErrors(app) {
    app.use(function notFoundHandler(_req, res) {
        res.status(404).send({
            message: 'Not Found',
        });
    });
    app.use(function errorHandler(err, req, res, next) {
        if (err instanceof tsoa_1.ValidateError) {
            console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
            return res.status(422).json({
                message: 'Validation Failed',
                details: err === null || err === void 0 ? void 0 : err.fields,
            });
        }
        if (err instanceof NotFoundError) {
            console.warn(`Caught Not Found Error for ${req.path}`);
            return res.status(404).json({
                message: 'Not Found',
            });
        }
        if (err instanceof pg_1.DatabaseError) {
            console.warn(`Caught Database Error:`, err);
            return res.status(400).json({
                message: `Database Error: ${err.message}`,
            });
        }
        if (err instanceof Error) {
            console.warn(err);
            return res.status(500).json({
                message: 'Internal Server Error',
            });
        }
        next();
    });
}
exports.HandleErrors = HandleErrors;
