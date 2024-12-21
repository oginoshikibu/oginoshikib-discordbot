import { REST, Routes, type Client, type TextChannel } from "discord.js";
import { sendMessageCron } from "../services/cronServices";
import * as commandMap from '../commands';
import type { Command } from "../commands/types";

export const clientReadyHandler = async (client: Client): Promise<void> => {
    console.log(`Logged in as ${client.user?.tag ?? 'unknown user'}`);


    const { DISCORD_BOT_TOKEN, GUILD_ID, CLIENT_ID, DEBUG_CHANNEL_ID } = process.env;

    const channel = client.channels.cache.get(DEBUG_CHANNEL_ID) as TextChannel;
    const currentTime = new Date().toLocaleTimeString();
    channel?.send(`Hello, world! The current time is ${currentTime}`);


    const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);
    const commands: Record<string, Command> = commandMap;   // 型推論
    console.log(`Started refreshing application (/) commands: ${Object.keys(commands).join(', ')}`);
    await Promise.all(Object.keys(commands).map(async (key) => {
        const command: Command = commands[key];
        try {
            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [command.data] });
            console.log(`Command ${command.data.name} registered`);
        } catch (error) {
            console.error(`Failed to register command ${command.data.name}: ${error}`);
        }
    }));

    sendMessageCron(client, `<@${process.env.USER_ID}> どうせやる`, '0,30 9-23 * * *');
}
