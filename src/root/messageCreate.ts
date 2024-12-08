import { Message } from "discord.js"

const messageCreate = async (message: Message): Promise<void> => {
    if (message.author.bot) return;
    console.log(`Message received: ${message.content}`);
    if (message.channel.id === process.env.BLOG_CHANNEL_ID) {
        try {
            const parsedMessageURL = new URL(message.content);
        } catch (error) {
            message.reply('Please provide a valid URL');
        }
    }
}


export default messageCreate;