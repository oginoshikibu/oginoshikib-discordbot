import { SlashCommandBuilder, SlashCommandNumberOption, SlashCommandStringOption, type CommandInteraction } from 'discord.js';
import type { Command } from './types';
import { workKindSeeds } from '../../prisma/seed';
import { insertTimelineByCommand } from '../services/timelineService';

const workKindOption: SlashCommandNumberOption = new SlashCommandNumberOption()
    .setName('work-kind')
    .setDescription(workKindSeeds.map((workKindSeed) => workKindSeed.name).join(' or '))
    .setRequired(true)
    .setChoices(workKindSeeds.map((workKindSeed) => ({ name: `${workKindSeed.id}: ${workKindSeed.name}`, value: workKindSeed.id })));


const commentOption: SlashCommandStringOption = new SlashCommandStringOption()
    .setName('comment')
    .setDescription('Comment')
    .setRequired(false);


const data = new SlashCommandBuilder()
    .setName('declare')
    .setDescription('Get a random article from the database')
    .addNumberOption(workKindOption)
    .addStringOption(commentOption);


const execute = async (interaction: CommandInteraction): Promise<void> => {
    console.log('start randomArticleCmd execute');

    await insertTimelineByCommand(interaction);
    
    console.log('end randomArticleCmd execute');
}

export const declareTimelineCmd: Command = {
    data,
    execute,
}

