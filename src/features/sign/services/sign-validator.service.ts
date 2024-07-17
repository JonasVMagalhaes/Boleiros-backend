import {body, ValidationChain} from "express-validator";
import {StringUtils} from "../../../shared/utils/string/string-utils";
import {PasswordUtils} from "../../../shared/utils/password/password-utils";
import {SignPostForm} from "../models/sign-post-form.enum";

export class SignValidatorService {
    handlePostValidator(): ValidationChain[] {
        const minLength = 6;
        const maxLength = 30;

        return [
            body(SignPostForm.USERNAME)
                .notEmpty().withMessage('Username is required')
                .isLength({ min: 6, max: 18 }).withMessage('Usuário precisa ter entre 6 e 18 caracteres'),
            body(SignPostForm.PASSWORD)
                .notEmpty().withMessage('Password is required')
                .isLength({ min: minLength }).withMessage(`A senha precisa ter pelo menos ${minLength} caracteres`)
                .isLength({ max: maxLength }).withMessage(`A senha precisa ter no máximo ${maxLength} caracteres`)
                .custom(StringUtils.hasNumber).withMessage('A senha precisa ter ao menos um número')
                .custom(StringUtils.hasLowercase).withMessage('A senha precisa ter pelo menos 1 caractere minúsculo')
                .custom(StringUtils.hasUppercase).withMessage('A senha precisa ter pelo menos 1 caractere maiúsculo')
                .custom(StringUtils.hasSpecialCharacter).withMessage('A senha precisa ter pelo menos um caractere especial')
                .custom(password => !StringUtils.hasWhiteSpace(password)).withMessage('A senha não pode ter espaço em branco')
                .custom(password => !PasswordUtils.isCommon(password)).withMessage('A senha digitada é muito simples')
        ]
    }
}