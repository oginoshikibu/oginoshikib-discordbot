import type { CommandInteraction } from "discord.js";
import { getLastDayTimeline, insertTimeline } from "../tables/timelineTable";
import { workKindSeeds } from "../../prisma/seed";


export const insertTimelineByCommand = async (interaction: CommandInteraction): Promise<void> => {
    console.log('start insertTimelineByCommand');
    const workKindContent = interaction.options.get('work-kind')?.value;
    const commentContent = interaction.options.get('comment')?.value
    console.log(`workKindContent: ${workKindContent}`);
    console.log(`commentContent: ${commentContent}`);

    if (!workKindContent || typeof workKindContent !== 'number') {
        await interaction.reply('Invalid work-kind value');
        return;
    }

    const comment = commentContent && typeof commentContent === 'string' ? commentContent : undefined;

    const { timeline, error } = await insertTimeline(workKindContent, new Date(), comment);
    if (timeline) {
        const message = await interaction.reply({
            content: `${workKindSeeds.find((workKindSeed) => workKindSeed.id === workKindContent)?.name} ${timeline.comment ? `${timeline.comment}` : ''}`, fetchReply: true
        });
        await message.react('👍');
    } else {
        await interaction.reply(`Failed to insert timeline: ${error.message}`);
    }

    console.log('end insertTimelineByCommand');
}

type TimelineCsv = {
    startedAt: string,
    workName: string,
    comment: string
}

export const summaryTimelineCsvByCommand = async (interaction: CommandInteraction): Promise<void> => {
    console.log('start summaryTimelineCsvByCommand');
    const timelines = await getLastDayTimeline();
    const timelineCsvs: TimelineCsv[] = timelines.map((timeline) => {
        return {
            startedAt: timeline.startedAt.toISOString(),
            workName: workKindSeeds.find((workKindSeed) => workKindSeed.id === timeline.workKindId)?.name || '',
            comment: timeline.comment ? timeline.comment : ''
        }
    });

    const csv = "startedAt,workName,comment\n" + timelineCsvs.map((timelineCsv) => {
        return `${timelineCsv.startedAt},${timelineCsv.workName},${timelineCsv.comment}`;
    }).join('\n');


    await interaction.reply({
        content: csv,
    });

    console.log('end summaryTimelineCsvByCommand');
}
