"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestBodyValidation = requestBodyValidation;
const zod_1 = require("zod");
function requestBodyValidation(schema) {
    return (req, res, next) => {
        try {
            const sanitizeBody = req.body;
            for (const key in sanitizeBody) {
                if (sanitizeBody.hasOwnProperty(key)) {
                    if (typeof sanitizeBody[key] === 'string' &&
                        sanitizeBody[key] === '') {
                        sanitizeBody[key] = null;
                    }
                }
            }
            const parsedBody = schema.strip().parse(sanitizeBody);
            req.body = parsedBody;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                return res
                    .status(400)
                    .json({ message: 'Invalid data', details: errorMessages });
            }
            else {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    };
}
