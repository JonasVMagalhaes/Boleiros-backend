import {ResponsePrimitive} from "../../../shared/interfaces/response-primitive.interface";
import {HttpStatus} from "../../../shared/enums/http-status.enum";
import {Register} from "../dtos/register";
import {RequisitionBodyResponse} from "../models/requisition-body-response";
import RegisterDBActions from "../../../schemes/register/register.schema";
import {ContextMessager} from "../../../shared/utils/messager/context-messager";
import {NodeMailerStrategy} from "../../../shared/utils/messager/email/nodemailer-strategy";
import {Request} from 'express';
import SignInDBActions from "../../../schemes/sign-in/sign-in.schema";

export class RegisterService {

    constructor(private readonly request: Request,
                private readonly register: Register) {}

    async save(): Promise<ResponsePrimitive<RequisitionBodyResponse>> {
        const alreadyParameters: string = await this.validateAlreadyParameters();
        if(alreadyParameters) {
            return this.emitErrorAlreadyParameters(alreadyParameters);
        }

        const registerSaved = await this.performSaveRegister();
        const signInSaved = await this.perfomSignIn(registerSaved.id);

        this.saveUserCache(signInSaved.access_token);
        this.sendEmail();

        return {
            code: HttpStatus.OK,
            message: "Salvo com sucesso",
            data: Register.toDto(this.register)
        }
   }

   private async validateAlreadyParameters(): Promise<string> {
       const isUsernameAlready = await RegisterDBActions.findOne({ username: this.register.username});
       if (isUsernameAlready) {
           return "Este email já encontra-se em uso";
       }

       const isEmailAlready = await RegisterDBActions.findOne({ email: this.register.email });
       if (isEmailAlready) {
           return "Este usuário já encontra-se em uso";
       }

       return null;
   }

   private saveUserCache(accessToken: string): void {
        this.request.session.id = accessToken;
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

   private performSaveRegister() {
       return RegisterDBActions.save({
           username: this.register.username,
           password: this.register.password,
           email: this.register.email
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