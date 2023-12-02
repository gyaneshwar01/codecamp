import { IMessage } from "@/models/chatbox";

import { Bot, UserRound } from "lucide-react";

interface IProps {
  message: IMessage;
  previousMessager?: "app" | "user" | null;
  nextMessager?: "app" | "user" | null;
}

const MessageItem: React.FC<IProps> = ({ message, previousMessager = null, nextMessager=null }) => {


    const userMessageRoundness = previousMessager !== "user" ? "rounded-md rounded-br-none" : "rounded-bl-md";
    
    const appMessageRoundness = previousMessager !== "app" ? "rounded-md rounded-bl-none" : "rounded-br-md";

    const messageGap = previousMessager === message.sender ? "mt-1" : "mt-3";
  
    if (message.sender === "app") {
    return (
      <div className={`self-start flex flex-col gap-1 ${messageGap}`}>
        <div className={`bg-primary text-black font-semibold ${appMessageRoundness} p-3`}>
          {message.text}
        </div>
        {nextMessager !== "app" && <Bot width={35} height={35} className="self-start" color="black"/>}
      </div>
    );
  } else {
    return (
      <div className={`self-end flex flex-col gap-1 ${messageGap}`}>
        <div className={`bg-primary text-black font-semibold ${userMessageRoundness} p-3`}>
          {message.text}
        </div>
        {nextMessager !== "user" && <UserRound width={35} height={35} className="self-end" color="black"/>}
      </div>
    );
  }
};

export default MessageItem;
