import { REST, Routes } from "discord.js";

const { DISCORD_BOT_TOKEN, GUILD_ID, CLIENT_ID } = process.env;

const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

// Delete all commands: https://discordjs.guide/slash-commands/deleting-commands.html#deleting-all-commands
// for guild-based commands
rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
    .then(() => console.log('Successfully deleted all guild commands.'))
    .catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);