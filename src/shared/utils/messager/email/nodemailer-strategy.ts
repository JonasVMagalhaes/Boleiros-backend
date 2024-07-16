import {MessagerStrategy} from "../models/messager-strategy";
import {DataSend} from "../models/data-send.interface";
import nodemailer from 'nodemailer';
import {EmailOptions} from "./email-options";

export class NodeMailerStrategy implements MessagerStrategy {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.createTransporter();
    }

    send(data: DataSend): void {
        const message: EmailOptions = this.createMail(data);
        this.transporter.sendMail(message);
    }

    private createTransporter(): void {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });
    }

    private createMail(data: DataSend): EmailOptions {
        return {
            from: data.from,
            to: data.to,
            subject: data.subject,
            text: data.message,
        }
    }
}