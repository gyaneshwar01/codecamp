"use client";

import TextAreaAutoSize from "react-textarea-autosize";
import { SendHorizontal } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { nanoid } from "nanoid";
import { useMutation } from "@tanstack/react-query";

import { IMessage } from "@/models/chatbox";
import { queryClient } from "@/lib/tanstack";

interface IProps {
  fileId: string;
}

interface IFieldValues {
  newMessage: string;
}

const InputBox: React.FC<IProps> = ({ fileId }) => {
  const { register, handleSubmit, reset } = useForm<IFieldValues>();

  const { mutate, isPending } = useMutation<any, any, IMessage>({
    mutationFn: async (message: IMessage) => {
      const sourceId = localStorage.getItem("source_id");

      if (sourceId === null) {
        console.log("Connection with the chatPDF api was broken !!");

        return;
      }

      const response = await fetch("/api/chats", {
        method: "POST",
        body: JSON.stringify({ message, sourceId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Some Error Occured!");
        return;
      }
    },
    onMutate: async (message: IMessage) => {
      await queryClient.cancelQueries();

      const cacheData = queryClient.getQueryData<IMessage[]>(["chats"]) || [];

      const appLoader: IMessage = {
        id: "loader-unique",
        text: ". . .",
        time: new Date().toISOString(),
        sender: "app",
        fileId,
      };

      queryClient.setQueryData<IMessage[]>(
        ["chats"],
        [appLoader, message, ...cacheData]
      );

      return cacheData;
    },
    onError: async (error, message, cacheData) => {
      console.log("rolling back to the previous stable state!!");
      queryClient.setQueryData(["chats"], cacheData);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  const sendMessage: SubmitHandler<IFieldValues> = async ({ newMessage }) => {
    //send messages to the api from here
    console.log(newMessage);

    if (newMessage.trim().length === 0) {
      return;
    }

    const message: IMessage = {
      text: newMessage,
      sender: "user",
      id: nanoid(),
      time: new Date().toISOString(),
      fileId,
    };

    mutate(message);

    reset();
  };

  return (
    <form className="flex items-center gap-2 h-fit py-4 px-2">
      <TextAreaAutoSize
        {...register("newMessage")}
        rows={1}
        className="resize-none w-full text-black p-2 focus:ring-2 ring-primary rounded-md focus:outline-none bg-input shadow-md disabled:bg-muted disabled:hover:cursor-wait"
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(sendMessage)();
          }
        }}
        disabled={isPending}
      />
      <SendHorizontal
        width={35}
        height={35}
        color="black"
        onClick={handleSubmit(sendMessage)}
      />
    </form>
  );
};

export default InputBox;
