export interface IMessage {
    text: string;
    time: Date;
    sender: "user" | "app";
    id: string;
}