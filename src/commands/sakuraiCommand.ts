import { SlashCommandBuilder, type CommandInteraction } from 'discord.js';
import type { Command } from './types';


const data = new SlashCommandBuilder()
    .setName('sakurai')
    .setDescription('とにかくやれ！');

const execute = async (interaction: CommandInteraction): Promise<void> => {
    console.log('start sakuraiCmd execute');
    await interaction.reply('https://www.youtube.com/watch?v=JV3KOJ_Z4Vs');
    console.log('end sakuraiCmd execute');
}

export const sakuraiCmd: Command = {
    data,
    execute,
}
