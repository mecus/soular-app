"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = (err, req, res, next) => {
    if (err) {
        console.log("New Error: ", err.stack);
        return res.send(err.stack);
    }
    console.log("Checking for error");
    next();
};
//# sourceMappingURL=errorHandle.js.map