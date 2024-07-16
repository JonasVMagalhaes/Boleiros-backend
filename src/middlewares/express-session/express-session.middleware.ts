import {ConfigurationsApp} from "../../configurations/application";
import session from 'express-session';

export default class ExpressSessionMiddleware {
    static middleware = session({
        secret: process.env.EXPRESS_SESSION_TOKEN, // Chave secreta para criptografar dados da sessão
        resave: false, // Evita a resalva da sessão se nada mudou
        saveUninitialized: false, // Evita salvar sessões não inicializadas
        cookie: {
            maxAge: ConfigurationsApp.timeCache, // Define o tempo máximo para armazenamento do cache de informações
        }
    });
}