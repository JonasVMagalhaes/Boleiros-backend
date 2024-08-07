import {Request} from 'express';

import {ResponsePrimitive} from "../../../shared/interfaces/response-primitive.interface";
import {HttpStatus} from "../../../shared/enums/http-status.enum";
import {Register} from "../dtos/register";
import {UserDBActions} from "../../../schemes/user/user-db-actions";
import {ResponsePostRegister} from "../models/response-post-register";
import {SignInDbActions} from "../../../schemes/sign-in/sign-in-db-actions";

export class RegisterCreateUsecase {
    constructor(private readonly request: Request,
                private readonly register: Register) {}

    async execute(): Promise<ResponsePrimitive<{} | ResponsePostRegister>> {
        const alreadyParameters: string = await this.validateAlreadyParameters();
        if(alreadyParameters) {
            return this.emitErrorAlreadyParameters(alreadyParameters);
        }

        const registerSaved = await this.performSaveUser();
        const signInSaved = await this.perfomSignIn(registerSaved.id);

        this.saveUserCache(signInSaved.access_token);
        this.sendEmail();

        return {
            code: HttpStatus.OK,
            message: "Salvo com sucesso",
            data: Register.toDto({
                username: this.register.username,
                access_token: signInSaved.access_token,
                expire_time: signInSaved.expire_time
            })
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
        console.log("TODO - Falta implementar")
        // this.request.session.id = accessToken;
    }

    private sendEmail(): void {
        console.log('TODO - Falta implementar');
        // const emailMessager: ContextMessager = new ContextMessager(new NodeMailerStrategy());
        //
        // emailMessager.send({
        //     from: 'string',
        //     to: 'string',
        //     subject: 'string',
        //     message: 'string'
        // });
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
        return SignInDbActions.save({ idUser });
    }

    private emitErrorAlreadyParameters(error: string): ResponsePrimitive<{}> {
        return {
            code: HttpStatus.CONFLICT,
            message: error
        }
    }
}