"use client";

import TextAreaAutoSize from "react-textarea-autosize";
import { SendHorizontal } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IProps {}

interface IFieldValues {
    newMessage: string;
}

const InputBox: React.FC<IProps> = () => {

    const { register, handleSubmit, reset } = useForm<IFieldValues>();

    const sendMessage: SubmitHandler<IFieldValues> = ({ newMessage }) => {
        //send messages to the api from here
        console.log(newMessage);

        reset();
    }

    const test = () => {
        console.log("error");
    }

  return (
    <form className="flex items-center gap-2 h-fit">
      <TextAreaAutoSize
        {...register("newMessage")}
        rows={1}
        className="resize-none w-full text-black p-2 rounded-md focus:outline-none"
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
