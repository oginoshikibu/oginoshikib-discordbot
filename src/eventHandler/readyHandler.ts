import type { Client, TextChannel } from "discord.js";
import { sendMessageEveryHour } from "../services/cron";

export const readyHandler = (client: Client): void => {
    console.log(`Logged in as ${client.user?.tag ?? 'unknown user'}`);
    const debugChannelId = process.env.DEBUG_CHANNEL_ID;
    if (debugChannelId) {
        const channel = client.channels.cache.get(debugChannelId) as TextChannel;
        const currentTime = new Date().toLocaleTimeString();
        channel?.send(`Hello, world! The current time is ${currentTime}`);
    } else {
        console.error('DEBUG_CHANNEL_ID is not defined');
    }

    sendMessageEveryHour(client, '<@726785650707267656> どうせやる');
}
