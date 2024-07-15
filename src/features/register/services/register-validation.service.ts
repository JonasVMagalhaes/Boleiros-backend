import {body, ValidationChain} from "express-validator";
import {StringUtils} from "../../../shared/utils/string/string-utils";
import {PasswordUtils} from "../../../shared/utils/password/password-utils";

export class RegisterValidatorService {
    handlePostValidator(): ValidationChain[] {
        const stringUtils: StringUtils = new StringUtils();
        const passwordUtils: PasswordUtils = new PasswordUtils();
        const minLength = 6;
        const maxLength = 30;

        return [
            body("username")
                .notEmpty().withMessage('Username is required')
                .isLength({ min: 6, max: 18 }).withMessage('Usuário precisa ter entre 6 e 18 caracteres'),
            body("password")
                .notEmpty().withMessage('Password is required')
                .isLength({ min: minLength }).withMessage(`A senha precisa ter pelo menos ${minLength} caracteres`)
                .isLength({ max: maxLength }).withMessage(`A senha precisa ter no máximo ${maxLength} caracteres`)
                .custom(stringUtils.hasNumber).withMessage('A senha precisa ter ao menos um número')
                .custom(stringUtils.hasLowercase).withMessage('A senha precisa ter pelo menos 1 caractere minúsculo')
                .custom(stringUtils.hasUppercase).withMessage('A senha precisa ter pelo menos 1 caractere maiúsculo')
                .custom(stringUtils.hasSpecialCharacter).withMessage('A senha precisa ter pelo menos um caractere especial')
                .custom(password => !stringUtils.hasWhiteSpace(password)).withMessage('A senha não pode ter espaço em branco')
                .custom(password => !passwordUtils.isCommon(password)).withMessage('A senha digitada é muito simples'),
            body("email")
                .notEmpty().withMessage("Email is required")
                .isEmail().withMessage('E necessário incluir um email válido')
        ]
    }
}