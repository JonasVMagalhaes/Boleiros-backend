import mongoose from 'mongoose';

import {CollectionName} from "../../models/collection-name.enum";
import {SignInDB} from "../models/sign-in-db.interface";
import {signInSchema} from "../schemas/sign-in.schema";

export class SignInDatabase {
    readonly signInModel = mongoose.model<SignInDB>(CollectionName.SIGN_IN, signInSchema);

    constructor() {
        this.setupCollections();
        this.setupTriggers();
    }

    private setupCollections(): void {
        this.createCollectionSignInModel();
    }

    private createCollectionSignInModel(): void {
        this.signInModel.createCollection();
    }

    private setupTriggers(): void {
        this.signInModel.watch()
            .on('change', () => this.signInModel.updateOne({ modifiedDate: Date.now }));
    }
}