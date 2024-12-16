'use strict';
import { REST, Client, GatewayIntentBits } from 'discord.js';
import { interactionCreateHandler, messageCreateHandler, readyHandler } from './eventHandler';

if (!process.env.DISCORD_BOT_TOKEN) {
    throw new Error('DISCORD_BOT_TOKEN is not defined');
}

if (!process.env.CLIENT_ID) {
    throw new Error('CLIENT_ID is not defined');
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', readyHandler);
client.on('messageCreate', messageCreateHandler);
client.on('interactionCreate', interactionCreateHandler);

client.login(process.env.DISCORD_BOT_TOKEN);
