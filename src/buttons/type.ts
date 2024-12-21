import type { ButtonBuilder, ButtonInteraction } from "discord.js";

export type Button = {
    button: ButtonBuilder;
    onClick: (interaction: ButtonInteraction) => Promise<void>;
}