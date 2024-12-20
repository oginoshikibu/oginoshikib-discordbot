import type { ApplicationCommandData, CommandInteraction } from 'discord.js';
import type { Command } from './types';


const data: ApplicationCommandData = {
    name: 'random-article',
    description: 'Get a random article from the database',
}

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