'use strict';
import { REST, Client, GatewayIntentBits, Events } from 'discord.js';
import { interactionCreateHandler, messageCreateHandler, clientReadyHandler } from './eventHandler';


const { DISCORD_BOT_TOKEN } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on(Events.ClientReady, clientReadyHandler);
client.on(Events.MessageCreate, messageCreateHandler);
client.on(Events.InteractionCreate, interactionCreateHandler);

client.login(DISCORD_BOT_TOKEN);
