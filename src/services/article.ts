import { PrismaClient } from "@prisma/client";
import type { Message } from "discord.js";
import { JSDOM } from "jsdom";


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


    const articleTitle = await (async () => {
        const response = await fetch(parsedMessageURL.href);
        const html = await response.text();
        const dom = new JSDOM(html);
        const title = dom.window.document.querySelector('title')?.textContent || 'No title';
        return title;
    })();

    const prismaClient = new PrismaClient();
    const Article = await prismaClient.article.create({
        data: {
            url: parsedMessageURL.href,
            title: "test",
        },
    });

    await prismaClient.$disconnect();
}