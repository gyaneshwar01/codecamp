import InputBox from "./InputBox";
import MessageBox from "./MessageBox";
import type { IMessage } from "@/models/chatbox";
import { nanoid } from "nanoid";

const DUMMY_MESSAGES: IMessage[] = [
  { text: "Hello 1", time: new Date("11/12/2023"), sender: "user", id: nanoid() },
  {
    text: "It's a good day 2",
    time: new Date("12/12/2023"),
    sender: "app",
    id: nanoid(),
  },
  {
    text: "It's a good day 3",
    time: new Date("12/12/2023"),
    sender: "app",
    id: nanoid(),
  },
  {
    text: "last text 4",
    time: new Date("5/12/2023"),
    sender: "user",
    id: nanoid(),
  },
  {
    text: "last text2 5",
    time: new Date("5/12/2023"),
    sender: "user",
    id: nanoid(),
  },
];

interface IProps {}

const ChatBox: React.FC<IProps> = () => {
  return (
    <div className="flex flex-col h-full p-2">
      <MessageBox messages={DUMMY_MESSAGES.reverse()} />
      <InputBox />
    </div>
  );
};

export default ChatBox;
