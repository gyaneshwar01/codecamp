"use client";

import { Loader2 } from "lucide-react";

import type { IMessage } from "@/models/chatbox";
import MessageItem from "./MessageItem";

interface IProps {
  messages: IMessage[];
  isPending: boolean;
}

const MessageBox: React.FC<IProps> = ({ messages, isPending }) => {
  return (
    <div className="flex flex-1 p-2 flex-col-reverse overflow-auto border-b-2 border-secondary-foreground">
      {messages.length === 0 && isPending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" width={35} height={35} />
          Loading...
        </div>
      ) : messages.length === 0 && !isPending ? (
        <div className="self-center pb-56 text-xl text-muted-foreground">Ask me Anything !</div>
      ) : (
        messages.map((message, index, array) => (
          <MessageItem
            message={message}
            key={message.id}
            nextMessager={index === 0 ? null : array[index - 1].sender}
            previousMessager={
              index + 1 === array.length ? null : array[index + 1].sender
            }
          />
        ))
      )}
    </div>
  );
};

export default MessageBox;
