import { PrismaClient } from "@prisma/client";
import { Message } from "discord.js"

const messageCreate = async (message: Message): Promise<void> => {
    if (message.author.bot) return;
    console.log(`Message received: (${message.createdTimestamp}) ${message.content}`);

    // register article
    if (message.channel.id === process.env.ARTICLE_CHANNEL_ID) {

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
}


export default messageCreate;