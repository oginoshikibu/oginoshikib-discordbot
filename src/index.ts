import { REST, TextChannel } from 'discord.js';
import { Client, GatewayIntentBits } from 'discord.js';
import messageCreate from './events/messageCreate';

if (!process.env.DISCORD_BOT_TOKEN) {
    throw new Error('DISCORD_BOT_TOKEN is not defined');
}

if (!process.env.CLIENT_ID) {
    throw new Error('CLIENT_ID is not defined');
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag ?? 'unknown user'}`);
    const channelId = process.env.CHANNEL_ID;
    if (channelId) {
        const channel = client.channels.cache.get(channelId) as TextChannel;
        const currentTime = new Date().toLocaleTimeString();
        channel?.send(`Hello, world! The current time is ${currentTime}`);
    } else {
        console.error('CHANNEL_ID is not defined');
    }
});

client.on('messageCreate', messageCreate);

client.login(process.env.DISCORD_BOT_TOKEN);
