import type { Interaction } from "discord.js";
import * as commandMap from '../commands';
import type { Command } from "../commands/types";
import * as buttonMap from '../buttons';
import type { Button } from "../buttons/type";

export const interactionCreateHandler = async (interaction: Interaction) => {

    if (interaction.isCommand()) {

        // 型推論
        const commands: Record<string, Command> = commandMap;
        const { commandName } = interaction;

        try {
            console.log(`Command: ${commandName}`);
            Object.keys(commands).forEach(async (key) => {
                const command: Command = commands[key];
                if (command.data.name === commandName) {
                    await command.execute(interaction);
                }
            });

        } catch (error: any) {
            console.error(error);
            await interaction.reply({ content: `There was an error while executing this command! \n ${error}`, ephemeral: true });
        }
        return;
    }

    if (interaction.isButton()) {
        console.log('Button interaction');
        const { customId } = interaction;

        // 型推論
        const buttons: Record<string, Button> = buttonMap;

        try {
            console.log(`Button: ${customId}`);
            Object.keys(buttons).forEach(async (key) => {
                const button: Button = buttons[key];
                if (button.customId === customId) {
                    await button.onClick(interaction);
                }
            });
        } catch (error: any) {
            console.error(error);
            await interaction.reply({ content: `There was an error while executing this button! \n ${error}`, ephemeral: true });
        }
        return;
    }
}
