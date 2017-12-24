import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const errorHandler = (err, req, res, next) => {
    if(err){
        console.log("New Error: ", err.stack);
        return res.send(err.stack);
    }
    console.log("Checking for error");
    next();
}
