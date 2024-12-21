import { ButtonBuilder, ButtonInteraction, ButtonStyle } from 'discord.js';
import type { Button } from './type';


const button = new ButtonBuilder()
    .setCustomId('delete-article')
    .setLabel('Delete')
    .setStyle(ButtonStyle.Danger);

const onClick = async (interaction: ButtonInteraction): Promise<void> => {
    console.log('start onClick');
    await interaction.reply({ content: 'Delete article', ephemeral: true });
    console.log('end onClick');
}

export const articleDeleteButton: Button = {
    button,
    onClick,
}
