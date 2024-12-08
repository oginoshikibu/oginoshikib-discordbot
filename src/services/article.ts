import { PrismaClient } from "@prisma/client";
import type { Message } from "discord.js";


export const registarArticleByMessage = async (message: Message): Promise<void> => {
    const parsedMessageURL = (() => {
        try {
            return new URL(message.content);
        }
        catch (error) {
            message.reply('Invalid URL');
            return null;
        }
    })();
    if (!parsedMessageURL) return;

    const prismaClient = new PrismaClient();
    const Article = await prismaClient.article.create({
        data: {
            url: parsedMessageURL.href,
            title: "test",
        },
    });

    await prismaClient.$disconnect();
}