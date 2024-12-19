import { Client, TextChannel } from "discord.js";
import { schedule } from "node-cron";

export const sendMessageCron = (client: Client, message: string, cronTime: string, notificationChannelId?: string): void => {
    notificationChannelId = notificationChannelId || process.env.NOTIFICATION_CHANNEL_ID;
    if (notificationChannelId) {
        const channel = client.channels.cache.get(notificationChannelId) as TextChannel;
        schedule(cronTime, () => {
            channel?.send(message);
            console.log(`Sent message to ${channel?.name} at ${new Date().toLocaleTimeString()}`);
        },{
            timezone: "Asia/Tokyo"
        }    
    );
    } else {
        console.error('NOTIFICATION_CHANNEL_ID is not defined');
    }
}