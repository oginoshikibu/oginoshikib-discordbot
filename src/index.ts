import { REST } from 'discord.js';
import { Client, GatewayIntentBits } from 'discord.js';
import messageCreate from './events/messageCreate';
import ready from './events/ready';

if (!process.env.DISCORD_BOT_TOKEN) {
    throw new Error('DISCORD_BOT_TOKEN is not defined');
}

if (!process.env.CLIENT_ID) {
    throw new Error('CLIENT_ID is not defined');
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', ready);
client.on('messageCreate', messageCreate);

client.login(process.env.DISCORD_BOT_TOKEN);
