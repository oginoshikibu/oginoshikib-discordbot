import type { CommandInteraction } from "discord.js";
import { insertTimeline } from "../tables/timelineTable";
import { workKindSeeds } from "../../prisma/seed";


export const insertTimelineByCommand = async (interaction: CommandInteraction): Promise<void> => {
    console.log('start insertTimelineByCommand');
    const workKindContent = interaction.options.get('work-kind');
    const commentContent = interaction.options.get('comment');
    console.log(`workKindContent: ${workKindContent?.value}`);
    console.log(`commentContent: ${commentContent?.value}`);

    if (!workKindContent || typeof workKindContent.value !== 'number') {
        await interaction.reply('Invalid work-kind value');
        return;
    }

    const comment = commentContent && typeof commentContent.value === 'string' ? commentContent.value : undefined;

    const { timeline, error } = await insertTimeline(workKindContent.value, new Date(), comment);
    if (timeline) {
        const message = await interaction.reply({ content: `${workKindSeeds[workKindContent.value].name} ${timeline.comment ? `(${timeline.comment})` : ''}`, fetchReply: true });
        await message.react('👍');
    } else {
        await interaction.reply(`Failed to insert timeline: ${error.message}`);
    }

    console.log('end insertTimelineByCommand');
}
