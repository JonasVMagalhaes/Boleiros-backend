const session = require('express-session');

export default class ExpressSessionMiddleware {
    static middleware = session({
        secret: process.env.EXPRESS_SESSION_TOKEN, // Chave secreta para criptografar dados da sessão
        resave: false, // Evita a resalva da sessão se nada mudou
        saveUninitialized: false, // Evita salvar sessões não inicializadas
        cookie: {
            maxAge: 3 * 60 * 60 * 1000, // Define o tempo máximo para armazenamento do cache de informações
        }
    });
}