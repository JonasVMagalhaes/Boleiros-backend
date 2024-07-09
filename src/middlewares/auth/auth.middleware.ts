import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
    static execute(req: Request, res: Response, next: NextFunction): void {
        next();
    }
}
