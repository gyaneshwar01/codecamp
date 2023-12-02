"use client";

import TextAreaAutoSize from "react-textarea-autosize";
import { SendHorizontal } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { nanoid } from "nanoid";
import { useMutation } from "@tanstack/react-query";

import { IMessage } from "@/models/chatbox";
import { queryClient } from "@/lib/tanstack";

interface IProps {}

interface IFieldValues {
    newMessage: string;
}

const InputBox: React.FC<IProps> = () => {

    const { register, handleSubmit, reset } = useForm<IFieldValues>();

    const { mutate } = useMutation<any, any, IMessage>({
      mutationFn: async (message: IMessage) => {

        const response = await fetch('/api/chats', {
          method: "POST",
          body: JSON.stringify(message),
          headers: {
            "Content-Type" : "application/json",
          }
        });

        if (!response.ok){
          console.log("Some Error Occured!");
          return;
        }
      },
      onMutate: async (message: IMessage) => {
        await queryClient.cancelQueries();

        const cacheData = queryClient.getQueryData<IMessage[]>(["chats"]) || [];

        queryClient.setQueryData<IMessage[]>(["chats"], [...cacheData, message]);

        return cacheData;
      },
      onError: async (error, message, cacheData) => {
        console.log('rolling back to the previous stable state!!');
        queryClient.setQueryData(["chats"], cacheData);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: ["chats"] });
      }
    });

    const sendMessage: SubmitHandler<IFieldValues> = async ({ newMessage }) => {
        //send messages to the api from here
        console.log(newMessage);

        if (newMessage.trim().length === 0){
          return;
        }

        const message: IMessage = {
          text: newMessage,
          sender: "user",
          id: nanoid(),
          time: new Date().toISOString(),
        }

        mutate(message);

        reset();
    }

    const test = () => {
        console.log("error");
    }

  return (
    <form className="flex items-center gap-2 h-fit py-4 px-2">
      <TextAreaAutoSize
        {...register("newMessage")}
        rows={1}
        className="resize-none w-full text-black p-2 rounded-md focus:outline-none bg-input"
        onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey){
                event.preventDefault();
                handleSubmit(sendMessage)();
            }
        }}
      />
      <SendHorizontal width={35} height={35} color="black" onClick={handleSubmit(sendMessage)}/>
    </form>
  );
};

export default InputBox;
