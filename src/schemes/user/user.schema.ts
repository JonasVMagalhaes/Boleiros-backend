import mongoose, {Document, Schema} from 'mongoose';
import {v4 as uuidv4} from 'uuid';

import {CollectionName} from "../models/collection-name.enum";
import {ConfigSchema} from "../config-schema";
import {EmailUtils} from "../../shared/utils/email/email.utils";
import {UserRole} from "../../shared/enums/user-role.enum";
import {PhoneUtils} from "../../shared/utils/phone/phone.utils";

export interface UserDBModel {
    username: string;
    password: string;
    email: string;
    phone?: string;
}

abstract class UserDB extends Document implements UserDBModel {
    id: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    verifiedEmail: boolean;
    role: UserRole;
    active: boolean;
    createdDate: Date;
    modifiedDate: Date;
}

const userSchema = new Schema<UserDB>({
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
    autoCreate: false,
    autoIndex: false,
    ...ConfigSchema
});

const UserModel = mongoose.model<UserDB>(CollectionName.USERS, userSchema);
const SensitiveUserModel = mongoose.model(CollectionName.SENSITIVE_USERS, userSchema);

UserModel.createCollection();
SensitiveUserModel.createCollection({
    viewOn: 'users',
    pipeline: [
        {
            $set: {
                username: { $substr: ['$email', 0, 0] },
                password: { $substr: ['$email', 0, 0] },
                email: { $concat: [{ $substr: ['$email', 0, 3] }, '...'] },
                phone: { $concat: [{ $substr: ['$phone', 0, 3] }, '...'] },
            }
        }
    ]
});

UserModel.watch()
    .on('change', () => UserModel.updateOne({ modifiedDate: Date.now}));

export class UserDBActions extends UserModel {
    static save(user: UserDBModel) {
        return UserModel.create({
            id: uuidv4(),
            username: user.username,
            email: user.email,
            password: user.password,
            phone: user.phone
        });
    }

    static findItemById(id: string) {
        return UserModel.findOne({id}).select('id username email');
    }

    static findUserByUsername(username: string) {
        return UserModel.findOne({username}).select('id');
    }

    static findUserByEmail(email: string) {
        return UserModel.findOne({email}).select('id');
    }

    static findVerifiedEmailById(id: string) {
        return UserModel.findOne({id}).select('verifiedEmail');
    }
};

export class SensitiveUserDBActions extends UserModel {
    static findItemById(id: string) {
        return SensitiveUserModel.findOne({id}).select('id username email phone');
    }
};