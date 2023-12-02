import type { IMessage } from "@/models/chatbox";
import MessageItem from "./MessageItem";

interface IProps {
  messages: IMessage[];
}

const MessageBox: React.FC<IProps> = ({ messages }) => {
  return (
    <div className="flex flex-1 p-2 flex-col-reverse overflow-auto border-b-2 border-secondary-foreground">
      {messages.map((message, index, array) => (
        <MessageItem
          message={message}
          key={message.id}
          nextMessager={index === 0 ? null : array[index - 1].sender}
          previousMessager={(index + 1) === array.length ? null : array[index + 1].sender}
        />
      ))}
    </div>
  );
};

export default MessageBox;
