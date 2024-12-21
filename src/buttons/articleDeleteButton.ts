import { ButtonBuilder, ButtonInteraction, ButtonStyle } from 'discord.js';
import type { Button } from './type';
import { deleteArticleById } from '../tables/articleTable';


const customId = 'delete-article';

const button = new ButtonBuilder()
    .setCustomId(customId)
    .setLabel('Delete')
    .setStyle(ButtonStyle.Danger);

const onClick = async (interaction: ButtonInteraction): Promise<void> => {
    console.log('start onClick');
    const getArticleIdFromMessage = (content: string): string | null => {
        const firstLine = content.split('\n')[0];
        const idMatch = firstLine.match(/id (\d+)/);
        const id = idMatch ? idMatch[1] : null;
        console.log(`Extracted id: ${id}`);
        return id;
    }

    const articleId = getArticleIdFromMessage(interaction.message.content);
    if (!articleId) {
        await interaction.reply({ content: 'Failed to extract article id from message.content', ephemeral: true });
        return;
    }

    try {
        // データベースから削除
        const { article, error } = await deleteArticleById(parseInt(articleId));
        if (article) {
            await interaction.update({ components: [] });   // ボタンを非表示
        } else {
            await interaction.reply({ content: `Failed to delete article: ${error.message}`, ephemeral: true });
        }
    } catch (error: any) {
        console.error(`Failed to delete article: ${error.message}`);
        await interaction.reply({ content: `Failed to delete article: ${error.message}`, ephemeral: true });
    }

    console.log('end onClick');
}

export const articleDeleteButton: Button = {
    customId,
    button,
    onClick,
}
