import { SlashCommandBuilder, type CommandInteraction } from 'discord.js';
import type { Command } from './types';


const data = new SlashCommandBuilder()
    .setName('summary')
    .setDescription('Get a summary of the timeline');

const execute = async (interaction: CommandInteraction): Promise<void> => {
    console.log('start summaryCmd execute');
    console.log('end summaryCmd execute');
}

export const summaryCmd: Command = {
    data,
    execute,
}
