import { Client, TextChannel } from "discord.js";
import { schedule } from "node-cron";
const { NOTIFICATION_CHANNEL_ID } = process.env;

export const sendMessageCron = (client: Client, message: string, cronTime: string, notificationChannelId?: string): void => {

    notificationChannelId = notificationChannelId || NOTIFICATION_CHANNEL_ID;
    const channel = client.channels.cache.get(notificationChannelId) as TextChannel;
    cronService(() => {
        channel?.send(message);
        console.log(`Sent message to ${channel?.name} at ${new Date().toLocaleTimeString()}`);
    }, cronTime, []);
}

export const cronService = (f: Function, cronTime: string, args: any[]): void => {
    schedule(cronTime, () => {
        f(...args);
        console.log(`Cron job executed at ${new Date().toLocaleTimeString()}`);
    }, {
        timezone: "Asia/Tokyo"
    });
}