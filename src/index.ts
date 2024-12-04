import { REST, Routes, TextChannel } from 'discord.js';
import { PrismaClient } from '@prisma/client';

// 接続test
const prisma = new PrismaClient();

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

if (!process.env.DISCORD_BOT_TOKEN) {
    throw new Error('DISCORD_BOT_TOKEN is not defined');
}

if (!process.env.CLIENT_ID) {
    throw new Error('CLIENT_ID is not defined');
}


const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag ?? 'unknown user'}!`);
    const channelId = process.env.CHANNEL_ID;
    if (channelId) {
        const channel = client.channels.cache.get(channelId) as TextChannel;
        channel?.send('Hello, world!');
    } else {
        console.error('CHANNEL_ID is not defined');
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);