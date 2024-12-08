import { PrismaClient } from "@prisma/client";
import { Message } from "discord.js"
import { registarArticleByMessage } from "../services/article";

const messageCreate = async (message: Message): Promise<void> => {
    if (message.author.bot) return;
    console.log(`Message received: (${message.createdTimestamp}) ${message.content}`);

    // register article
    if (message.channel.id === process.env.ARTICLE_CHANNEL_ID) {
        registarArticleByMessage(message);
    }
}


export default messageCreate;