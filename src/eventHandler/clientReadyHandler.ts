import type { Client, TextChannel } from "discord.js";
import { sendMessageCron } from "../services/cronServices";
const { DEBUG_CHANNEL_ID, USER_ID } = process.env;


export const clientReadyHandler = async (client: Client): Promise<void> => {
    console.log('clientReadyHandler start');
    console.log(`Logged in as ${client.user?.tag ?? 'unknown user'}`);

    const channel = client.channels.cache.get(DEBUG_CHANNEL_ID) as TextChannel;
    const currentTime = new Date().toLocaleTimeString();
    channel?.send(`Hello, world! The current time is ${currentTime}`);


    sendMessageCron(client, `<@${USER_ID}> どうせやる`, '0,30 9-23 * * *');
    console.log('Finished setting cron job');

    console.log('clientReadyHandler end');
}
