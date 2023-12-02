import { z } from "zod";

export const IMessageSchema = z.object({
    text: z.string().trim().min(1, "Empty message cannot be sent!"),
    time: z.string().refine( (ISOString) => {
        const date = new Date(ISOString);

        const result = date.getDate();

        return !isNaN(result);
    }),
    sender: z.enum(["user", "app"]),
    id: z.string(),
})

export const IArrayOfMessage = z.array(IMessageSchema);


export type IMessage = z.infer<typeof IMessageSchema>;