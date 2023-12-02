import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { executeInDB } from "@/lib/db";
import { IMessage, IMessageSchema, IArrayOfMessage } from "@/models/chatbox";

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    try {
        const parsedBody = IMessageSchema.parse(body);

        await executeInDB("chat", async (collection) => {
            await collection.insertOne(parsedBody);
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

    return data;
}