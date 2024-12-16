import { Client, TextChannel } from "discord.js";

export const sendMessageEveryHour = (client: Client, message: string) => {
    const notificationChannelId = process.env.NOTIFICATION_CHANNEL_ID;
    if (notificationChannelId) {
        const channel = client.channels.cache.get(notificationChannelId) as TextChannel;
        const ONE_HOUR_IN_MS = 60 * 60 * 1000;
        setInterval(() => {
            channel?.send(message);
            console.log(`Sent message to ${channel?.name} at ${new Date().toLocaleTimeString()}`);
        }, ONE_HOUR_IN_MS);

    } else {
        console.error('NOTIFICATION_CHANNEL_ID is not defined');
    }
}