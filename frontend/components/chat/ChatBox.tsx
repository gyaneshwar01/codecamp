"use client";

import { useQuery } from "@tanstack/react-query";

import InputBox from "./InputBox";
import MessageBox from "./MessageBox";
import type { IMessage } from "@/models/chatbox";
import { nanoid } from "nanoid";

const DUMMY_MESSAGES: IMessage[] = [
  { text: "Hello 1", time: "11/12/2023", sender: "user", id: nanoid() },
  {
    text: "It's a good day 2",
    time: "12/12/2023",
    sender: "app",
    id: nanoid(),
  },
  {
    text: "It's a good day 3",
    time: "12/12/2023",
    sender: "app",
    id: nanoid(),
  },
  {
    text: "last text 4",
    time: "5/12/2023",
    sender: "user",
    id: nanoid(),
  },
  {
    text: "last text2 5",
    time: "5/12/2023",
    sender: "user",
    id: nanoid(),
  },
];

interface IProps {}

const ChatBox: React.FC<IProps> = () => {
  const { data } = useQuery<IMessage[]>({
    queryKey: ["chats"],
    queryFn: async () => {
      return [];
    }
  });

  return (
    <div className="flex flex-col h-full bg-primary-foreground">
      <MessageBox messages={DUMMY_MESSAGES.reverse()} />
      <InputBox />
    </div>
  );
};

export default ChatBox;
