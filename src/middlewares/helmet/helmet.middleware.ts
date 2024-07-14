import helmet from 'helmet';

export default class HelmetMiddleware {
    static middleware = helmet({
            // origin: ["https://seu-dominio.com", "http://localhost:3000"],
    });
}