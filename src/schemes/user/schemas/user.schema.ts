import mongoose, {Schema} from "mongoose";
import {EmailUtils} from "../../../shared/utils/email/email.utils";
import {UserRole} from "../../../shared/enums/user-role.enum";
import {PhoneUtils} from "../../../shared/utils/phone/phone.utils";
import {ConfigSchema} from "../../config-schema";
import {UserDB} from "../models/user-db.interface";

export const userSchema = new Schema<UserDB>({
    id: {
        type: String,
        index: true,
        required: true,
        unique: true,
        immutable: true
    },
    username: {
        type: String,
        required: [true, "A inclusão do username email é obrigatória no banco de dados"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        select: false,
        required: [true, "A inclusão do campo password é obrigatória no banco de dados"],
    },
    email: {
        type: String,
        select: false,
        required: [true, "A inclusão do campo email é obrigatória no banco de dados"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (email: string) => EmailUtils.validate(email),
            message: (props: mongoose.ValidatorProps): string => `${props.value} não é um email válido`
        }
    },
    phone: {
        type: String,
        select: false,
        required: false,
        trim: true,
        validate: {
            validator: (phone: string) => PhoneUtils.validate(phone),
            message: (props: mongoose.ValidatorProps): string => `${props.value} não é um telefone válido`
        }
    },
    verifiedEmail: {
        type: Boolean,
        select: false,
        required: true,
        default: false
    },
    role: {
        type: String,
        select: false,
        required: true,
        enum: UserRole,
        default: UserRole.USER,
        alias: 'userRole'
    },
    active: {
        type: Boolean,
        select: false,
        required: true,
        default: true
    },
    createdDate: {
        type: Date,
        select: false,
        required: true,
        default: Date.now,
        immutable: true
    },
    modifiedDate: {
        type: Date,
        select: false,
        required: true,
        default: Date.now
    },
}, {
    autoCreate: false, // Necessário para o trigger do SensisitiveUser
    autoIndex: false, // Necessário para o trigger do SensisitiveUser
    ...ConfigSchema
});