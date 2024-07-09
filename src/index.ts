import express, { Response } from "express";
import dotenv from "dotenv";

import { HelmetMiddleware } from './middlewares/helmet/helmet.middleware';
import { CorsMiddleware } from "./middlewares/cors/cors.middleware";
import { ExpressSessionMiddleware } from './middlewares/express-session/express-session.middleware';

const app = express();
dotenv.config();

app.use(ExpressSessionMiddleware.middleware);
app.use(CorsMiddleware.middleware);
app.use(HelmetMiddleware.middleware);

app.post("/sign", (req: any, res: Response) => {
    console.log("teste123")
    const signin = true;
    if(signin) {
        req.session.user = {
            username: 'Jonas',
            accessToken: '123456'
        }
    }

    res.status(200).json({})    
});

app.get("/auth", (req: any, res: Response) => {
    res.status(200).json({
        username: req.session.user.username,
    });
})

app.listen(process.env.PORT || 3000, () => console.log("Iniciando projeto node na porta " + process.env.PORT));
