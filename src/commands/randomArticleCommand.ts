import { SlashCommandBuilder, type CommandInteraction } from 'discord.js';
import type { Command } from './types';
import { replyRandomArticle } from '../services/articleServices';


const data = new SlashCommandBuilder()
    .setName('random-article')
    .setDescription('Get a random article from the database');

const execute = async (interaction: CommandInteraction): Promise<void> => {
    console.log('start randomArticleCmd execute');
    await replyRandomArticle(interaction);
    console.log('end randomArticleCmd execute');
}

export const randomArticleCmd: Command = {
    data,
    execute,
}
