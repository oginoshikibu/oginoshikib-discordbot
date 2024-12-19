import { Message } from "discord.js"
import { registerArticleByMessage } from "../services/articleServices";

export const messageCreateHandler = async (message: Message): Promise<void> => {
    if (message.author.bot) return;
    console.log(`Message received: (${message.createdTimestamp}) ${message.content}`);

    // register article
    if (message.channel.id === process.env.ARTICLE_CHANNEL_ID) {
        registerArticleByMessage(message);
    }
}

