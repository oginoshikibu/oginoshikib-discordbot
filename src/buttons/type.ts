import type { ButtonBuilder, ButtonInteraction } from "discord.js";

export type Button = {
    customId: string;   // ButtonBuilderからcustomIdが取得できないため、別途定義
    button: ButtonBuilder;
    onClick: (interaction: ButtonInteraction) => Promise<void>;
}