import {Request} from "express";

export default class TimeoutMiddleware {
    static middleware = (req: Request) => {
        req.setTimeout(30000);
    };
}