import { GenerateUUID } from "./../../core/helper";

export default class Packet {
    constructor(sender, receiver, data, type = "json") {
        this._uuid = GenerateUUID();
        this._type = "data-connector.packet";
        this._sender = sender;
        this._receiver = receiver;
        this._payload = {
            type: type,
            data: data
        };
        this._timestamp = Date.now();

        return Object.freeze(this);
    }

    UUID() {
        return this._uuid;
    }

    getType() {
        return this._type;
    }
    getSender() {
        return this._sender;
    }
    getReceiver() {
        return this._receiver;
    }
    getPayload() {
        return this._payload;
    }
    getTimestamp() {
        return this._timestamp;
    }

    toJSON() {
        return JSON.stringify({
            UUID: this.UUID(),
            Type: this.getType(),
            Sender: this.getSender(),
            Receiver: this.getReceiver(),
            Payload: this.getPayload(),
            Timestamp: this.getTimestamp()
        });
    }

    static fromJSON(json) {
        let obj = json;

        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(obj);
        }

        let msg = new Packet(
            obj._sender,
            obj._receiver,
            obj._payload,
            obj._type
        );

        return msg;
    }
}