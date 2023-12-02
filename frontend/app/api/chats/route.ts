import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { nanoid } from "nanoid";
import axios from "axios";

import { executeInDB } from "@/lib/db";
import { IMessage, IMessageSchema, IArrayOfMessage } from "@/models/chatbox";

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    try {
        const parsedBody = IMessageSchema.parse(body);

        await executeInDB("chat", async (collection) => {
            await collection.insertOne(parsedBody);
        });

        const config = {
            headers: {
              "x-api-key": "sec_iY5xsXDmgmQ93ea8XHbciw3NTQ4BIeEk",
              "Content-Type": "application/json",
            },
          };

        const data = {
            sourceId: "src_EW1PmG01k0wq7YzA8P2FE",
            messages: [
              {
                role: "user",
                content: parsedBody.text,
              },
            ],
          };

        const response = await axios.post("https://api.chatpdf.com/v1/chats/message", data, config);
        
        //communicate with ankits model here.................. eg:
        const ankitsReply: IMessage = {
            id: nanoid(),
            text: response.data.content,
            sender: "app",
            time: new Date().toISOString(),
            fileId: parsedBody.fileId,
        }

        await executeInDB("chat", async (collection) => {
            await collection.insertOne(ankitsReply);
        });
        
        return new NextResponse("ok");


    } catch(error){
        if (error instanceof ZodError){
            return new NextResponse("Please do not send data from postman!", { status: 401 });
        }

        return new NextResponse('Some Error occured !!', { status: 400 });
    }
}

export const GET = async () => {
    const data = await executeInDB<IMessage[]>("chat", async (collection) => {
        const dbResponse = await (await collection.find()).toArray();

        const convertedData = dbResponse.map( (message) => {
            let copyOfItem: any = message;

            delete copyOfItem["_id"];

            return copyOfItem;
        });

        const parsedData = IArrayOfMessage.safeParse(convertedData);

        if (!parsedData.success){
            return [];
        } else {
            return parsedData.data;
        }
    });

    return new NextResponse(JSON.stringify(data));
}

export const DELETE = async (req: NextRequest) => {
    const body = await req.json();

    const result = await executeInDB<"OK" | "NOTOK">("chat", async (collection) => {
        try {
            await collection.deleteMany({ fileId: body.fileId });

            return "OK";
        } catch (error){
            console.log("An Error occured while deleting the messages !!");

            return "NOTOK"
        }

    });

    if (result === 'OK'){
        return new NextResponse("ok");
    } else {
        return new NextResponse("Some Error Occured !", { status: 400 });
    }
}