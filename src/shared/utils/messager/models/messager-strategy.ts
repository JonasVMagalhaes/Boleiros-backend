import {DataSend} from "./data-send.interface";

export abstract class MessagerStrategy {
    abstract send(data: DataSend): void;
}