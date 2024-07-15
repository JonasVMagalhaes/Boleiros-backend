import {RequisitionBodyRegister} from "../models/requisition-body-register";
import {RequisitionBodyResponse} from "../models/requisition-body-response";

import { v4 as uuidv4 } from "uuid";

export class Register {
    private id: string;
    private username: string;
    private password: string;
    private email: string;

    private generateId() {
        this.id = uuidv4();
    }

    static fromDto(body: RequisitionBodyRegister): Register {
        const register = new Register();
        register.generateId();
        register.username = body.username;
        register.password = body.password;
        register.email = body.email;
        return register;
    }

    static toDto(register: Register): RequisitionBodyResponse {
        return {
            id: register.id
        };
    }
}