import { PrismaClient } from "@prisma/client";
import { Message } from "discord.js"

const messageCreate = async (message: Message): Promise<void> => {
    if (message.author.bot) return;
    console.log(`Message received: (${message.createdTimestamp}) ${message.content}`);

    // register blog
    if (message.channel.id === process.env.BLOG_CHANNEL_ID) {

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
        const Blog = await prismaClient.blog.create({
            data: {
                url: parsedMessageURL.href,
                title: "test",
            },
        });

        await prismaClient.$disconnect();
    }
}


export default messageCreate;