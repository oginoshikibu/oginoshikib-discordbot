import { REST, Routes } from "discord.js";
import * as commandMap from '..';
import type { Command } from "../types";


const { DISCORD_BOT_TOKEN, GUILD_ID, CLIENT_ID } = process.env;

const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);
const commands: Record<string, Command> = commandMap;   // 型推論
console.log(`Started refreshing application (/) commands: ${Object.keys(commands).join(', ')}`);
const commandData = Object.values(commands).map(command => command.data);
try {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commandData });
    console.log(`Commands registered: ${commandData.map(cmd => cmd.name).join(', ')}`);
} catch (error) {
    console.error(`Failed to register commands: ${error}`);
}
console.log('Finished refreshing application (/) commands');

