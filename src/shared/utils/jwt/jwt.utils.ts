import jwt from 'jsonwebtoken';
import {ConfigurationsApp} from "../../../configurations/application";

export class JwtUtils {
    static generate<T>(data: T): string {
        return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: ConfigurationsApp.timeCache });
    }
}