import {MessagerStrategy} from "./models/messager-strategy";
import {DataSend} from "./models/data-send.interface";

export class ContextMessager {
    constructor(private readonly strategy: MessagerStrategy) {}

    send(data: DataSend): void {
        this.strategy.send(data);
    }
}