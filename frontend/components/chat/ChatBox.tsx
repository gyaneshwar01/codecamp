"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bot } from "lucide-react";

import InputBox from "./InputBox";
import MessageBox from "./MessageBox";
import type { IMessage } from "@/models/chatbox";

interface IProps {
  fileId: string;
}

const ChatBox: React.FC<IProps> = ({ fileId }) => {
  const { data, isPending } = useQuery<IMessage[]>({
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

  const filteredData = useMemo( () => (data || []).filter( ({ fileId: storedId }) => storedId === fileId), [data, fileId]);

  return (
    <div className="flex flex-col h-full bg-primary-foreground">
      <div className="w-full py-3 mb-1 bg-primary self-stretch text-lg font-semibold flex flex-row items-center gap-5 pl-4 text-white"><Bot width={35} height={35} />Chat Box</div>
      <MessageBox messages={filteredData} isPending={isPending} />
      <InputBox fileId={fileId}/>
    </div>
  );
};

export default ChatBox;
