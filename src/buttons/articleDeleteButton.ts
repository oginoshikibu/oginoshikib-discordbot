import { ButtonBuilder, ButtonInteraction, ButtonStyle } from 'discord.js';
import type { Button } from './type';


const customId = 'delete-article';

const button = new ButtonBuilder()
    .setCustomId(customId)
    .setLabel('Delete')
    .setStyle(ButtonStyle.Danger);

const onClick = async (interaction: ButtonInteraction): Promise<void> => {
    console.log('start onClick');
    console.log('end onClick');
}

export const articleDeleteButton: Button = {
    customId,
    button,
    onClick,
}
