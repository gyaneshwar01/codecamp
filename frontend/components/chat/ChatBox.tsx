"use client";

import { useQuery } from "@tanstack/react-query";

import InputBox from "./InputBox";
import MessageBox from "./MessageBox";
import type { IMessage } from "@/models/chatbox";

interface IProps {}

const ChatBox: React.FC<IProps> = () => {
  const { data } = useQuery<IMessage[]>({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await fetch("/api/chats");

      if (!response.ok){
        return [];
      }

      const data = await response.json();

  

      data.reverse();

      return data;
    }
  });

  return (
    <div className="flex flex-col h-full bg-primary-foreground">
      <MessageBox messages={(data || [])} />
      <InputBox />
    </div>
  );
};

export default ChatBox;
