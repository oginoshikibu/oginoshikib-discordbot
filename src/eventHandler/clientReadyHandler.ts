import { REST, Routes, type Client, type TextChannel } from "discord.js";
import { sendMessageCron } from "../services/cronServices";
import * as Commands from '../commands';
import type { Command } from "../commands/types";


export const clientReadyHandler = (client: Client): void => {
    console.log(`Logged in as ${client.user?.tag ?? 'unknown user'}`);
    const debugChannelId = process.env.DEBUG_CHANNEL_ID;
    if (debugChannelId) {
        const channel = client.channels.cache.get(debugChannelId) as TextChannel;
        const currentTime = new Date().toLocaleTimeString();
        channel?.send(`Hello, world! The current time is ${currentTime}`);
    } else {
        console.error('DEBUG_CHANNEL_ID is not defined');
    }

    // commands
    const GUILD_ID = process.env.GUILD_ID;
    if (!GUILD_ID) {
        throw new Error('GUILD_ID is not defined');
    }
    const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    if (!DISCORD_BOT_TOKEN) {
        throw new Error('DISCORD_BOT_TOKEN is not defined');
    }
    const CLIENT_ID = process.env.CLIENT_ID;
    if (!CLIENT_ID) {
        throw new Error('CLIENT_ID is not defined');
    }
    const keys = Object.keys(Commands);
    const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);
    keys.forEach(async (key) => {
        const command: Command = Commands[key as keyof typeof Commands];
        try {
            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [command.data] });
            console.log(`Command ${command.data.name} registered`);
        } catch (error) {
            console.error(`Failed to register command ${command.data.name}: ${error}`);
        }
    });


    sendMessageCron(client, `<@${process.env.USER_ID}> どうせやる`, '0,30 9-23 * * *');
}
