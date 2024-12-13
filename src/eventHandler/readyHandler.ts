import type { Client, TextChannel } from "discord.js";

export const readyHandler = (client: Client): void => {
    console.log(`Logged in as ${client.user?.tag ?? 'unknown user'}`);
    const channelId = process.env.CHANNEL_ID;
    if (channelId) {
        const channel = client.channels.cache.get(channelId) as TextChannel;
        const currentTime = new Date().toLocaleTimeString();
        channel?.send(`Hello, world! The current time is ${currentTime}`);
    } else {
        console.error('CHANNEL_ID is not defined');
    }
}
