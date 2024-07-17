import mongoose from 'mongoose';

import {CollectionName} from "../../models/collection-name.enum";
import {userSchema} from "../schemas/user.schema";
import {UserDB} from "../models/user-db.interface";

export class UserDatabase {
    readonly userModel = mongoose.model<UserDB>(CollectionName.USERS, userSchema);
    readonly sensitiveUserModel = mongoose.model(CollectionName.SENSITIVE_USERS, userSchema);

    constructor() {
        this.setupCollections();
        this.setupTriggers();
    }

    private setupCollections(): void {
        this.createCollectionUserModel();
        this.createCollectionSensitiveUserModel();
    }

    private createCollectionUserModel(): void {
        this.userModel.createCollection();
    }

    private createCollectionSensitiveUserModel(): void {
        this.sensitiveUserModel.createCollection({
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
    }

    private setupTriggers(): void {
        this.userModel.watch()
            .on('change', () => this.userModel.updateOne({ modifiedDate: Date.now}));
    }
}