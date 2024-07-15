import {RequisitionBodyRegister} from "../models/requisition-body-register";
import {RequisitionBodyResponse} from "../models/requisition-body-response";

export class Register {
    private _id: string;
    private _username: string;
    private _password: string;
    private _email: string;

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

    static fromDto(body: RequisitionBodyRegister): Register {
        const register = new Register();
        register._username = body.username;
        register._password = body.password;
        register._email = body.email;
        return register;
    }

    static toDto(register: Register): RequisitionBodyResponse {
        return {
            id: register._id
        };
    }
}