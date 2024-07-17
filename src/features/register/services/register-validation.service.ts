import {body, ValidationChain} from "express-validator";
import {StringUtils} from "../../../shared/utils/string/string-utils";
import {PasswordUtils} from "../../../shared/utils/password/password-utils";
import {PhoneUtils} from "../../../shared/utils/phone/phone.utils";

export class RegisterValidatorService {
    handlePostValidator(): ValidationChain[] {
        const minLengthPassword = 6;
        const maxLengthPassword = 30;
        const minLengthPhone = 8;
        const maxLengthPhone = 30;

        return [
            body("username")
                .notEmpty().withMessage('Username is required')
                .isLength({ min: 6, max: 18 }).withMessage('Usuário precisa ter entre 6 e 18 caracteres'),
            body("password")
                .notEmpty().withMessage('Password is required')
                .isLength({ min: minLengthPassword }).withMessage(`A senha precisa ter pelo menos ${minLengthPassword} caracteres`)
                .isLength({ max: maxLengthPassword }).withMessage(`A senha precisa ter no máximo ${maxLengthPassword} caracteres`)
                .custom(StringUtils.hasNumber).withMessage('A senha precisa ter ao menos um número')
                .custom(StringUtils.hasLowercase).withMessage('A senha precisa ter pelo menos 1 caractere minúsculo')
                .custom(StringUtils.hasUppercase).withMessage('A senha precisa ter pelo menos 1 caractere maiúsculo')
                .custom(StringUtils.hasSpecialCharacter).withMessage('A senha precisa ter pelo menos um caractere especial')
                .custom(password => !StringUtils.hasWhiteSpace(password)).withMessage('A senha não pode ter espaço em branco')
                .custom(password => !PasswordUtils.isCommon(password)).withMessage('A senha digitada é muito simples'),
            body("email")
                .notEmpty().withMessage("Email is required")
                .isEmail().withMessage('E necessário incluir um email válido'),
            body("phone")
                .isLength({ min: minLengthPhone }).withMessage(`O telefone precisa ter pelo menos ${minLengthPhone} caracteres`)
                .isLength({ max: maxLengthPhone }).withMessage(`O telefone precisa ter no máximo ${maxLengthPhone} caracteres`)
                .custom(PhoneUtils.validate).withMessage("O telefone possui caracteres não permitidos")
        ]
    }
}