import { SlashCommandBuilder, type CommandInteraction } from 'discord.js';
import type { Command } from './types';
import { summaryTimelineCsvByCommand } from '../services/timelineService';


const data = new SlashCommandBuilder()
    .setName('summary')
    .setDescription('Get a summary of the timeline');

const execute = async (interaction: CommandInteraction): Promise<void> => {
    console.log('start summaryCmd execute');
    await summaryTimelineCsvByCommand(interaction);
    console.log('end summaryCmd execute');
}

export const summaryCmd: Command = {
    data,
    execute,
}
