import {Request} from 'express';
import {ResponsePrimitive} from "../../../shared/interfaces/response-primitive.interface";
import {HttpStatus} from "../../../shared/enums/http-status.enum";
import {Register} from "../dtos/register";
import {RequisitionBodyResponse} from "../models/requisition-body-response";
import {ContextMessager} from "../../../shared/utils/messager/context-messager";
import {NodeMailerStrategy} from "../../../shared/utils/messager/email/nodemailer-strategy";
import SignInDBActions from "../../../schemes/sign-in/sign-in.schema";
import UserDBActions from "../../../schemes/user/user.schema";

export class RegisterCreateUsecase {

    constructor(private readonly request: Request,
                private readonly register: Register) {}

    async execute(): Promise<ResponsePrimitive<RequisitionBodyResponse>> {
        const alreadyParameters: string = await this.validateAlreadyParameters();
        if(alreadyParameters) {
            return this.emitErrorAlreadyParameters(alreadyParameters);
        }

        const registerSaved = await this.performSaveUser();
        const signInSaved = await this.perfomSignIn(registerSaved.id);

        // this.saveUserCache(signInSaved.access_token);
        // this.sendEmail();

        return {
            code: HttpStatus.OK,
            message: "Salvo com sucesso",
            data: registerSaved
        }
    }

    private async validateAlreadyParameters(): Promise<string> {
        const isUsernameAlready = await UserDBActions.findUserByUsername(this.register.username);
        if (isUsernameAlready) {
            return "Este usuário já encontra-se em uso";
        }

        const isEmailAlready = await UserDBActions.findUserByEmail(this.register.email);
        if (isEmailAlready) {
            return "Este email já encontra-se em uso";
        }

        return null;
    }

    private saveUserCache(accessToken: string): void {
        // this.request.session.id = accessToken;
    }

    private sendEmail(): void {
        const emailMessager: ContextMessager = new ContextMessager(new NodeMailerStrategy());

        emailMessager.send({
            from: 'string',
            to: 'string',
            subject: 'string',
            message: 'string'
        });
    }

    private performSaveUser() {
        return UserDBActions.save({
            username: this.register.username,
            password: this.register.password,
            email: this.register.email,
            phone: this.register.phone
        });
    }

    private perfomSignIn(idUser: string) {
        return SignInDBActions.save({ idUser });
    }

    private emitErrorAlreadyParameters(error: string): ResponsePrimitive<{}> {
        return {
            code: HttpStatus.CONFLICT,
            message: error
        }
    }
}