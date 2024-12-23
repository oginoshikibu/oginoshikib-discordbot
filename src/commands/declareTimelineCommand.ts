import { SlashCommandBuilder, SlashCommandNumberOption, SlashCommandStringOption, type CommandInteraction } from 'discord.js';
import type { Command } from './types';
import { workKindSeeds } from '../../prisma/seed';

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

    const workKind = interaction.options.get('work-kind');
    const comment = interaction.options.get('comment');

    console.log(`workKind: ${workKind}`);
    console.log(`comment: ${comment}`);

    await interaction.reply(`workKind: ${workKind}, comment: ${comment}`);


    console.log('end randomArticleCmd execute');
}

export const declareTimelineCmd: Command = {
    data,
    execute,
}

