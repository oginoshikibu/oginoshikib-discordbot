import { SlashCommandBuilder, type CommandInteraction } from 'discord.js';
import type { Command } from './types';


const data = new SlashCommandBuilder()
    .setName('random-article')
    .setDescription('Get a random article from the wiki');

const execute = async (interaction: CommandInteraction): Promise<void> => {
    console.log('start randomArticleCmd execute');
    interaction.reply('Hello, world!');
    console.log('end randomArticleCmd execute');
}

const randomArticleCmd: Command = {
    data,
    execute,
}

export default randomArticleCmd;