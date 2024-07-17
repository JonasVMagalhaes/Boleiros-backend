import {RequestPostRegister} from "../models/request-post-register";
import {ResponsePostRegister} from "../models/response-post-register";

export class Register {
    private _id: string;
    private _username: string;
    private _password: string;
    private _email: string;
    private _phone: string;

    get id(): string {
        return this._id;
    }

    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    get email(): string {
        return this._email;
    }

    get phone(): string {
        return this._phone;
    }

    static fromDto(body: RequestPostRegister): Register {
        const register = new Register();
        register._username = body.username;
        register._password = body.password;
        register._email = body.email;
        register._phone = body.phone;
        return register;
    }

    static toDto(register: {
        username: string,
        access_token: string,
        expire_time: number
    }): ResponsePostRegister {
        return {
            username: register.username,
            access_token: register.access_token,
            expire_time: register.expire_time,
        };
    }
}