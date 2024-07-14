import { NextFunction, Request, Response } from "express";

export default class AuthMiddleware {
    static execute(req: Request, res: Response, next: NextFunction): void {
        next();
    }
}
