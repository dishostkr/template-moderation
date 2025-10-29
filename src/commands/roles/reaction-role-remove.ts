import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    PermissionFlagsBits,
} from "discord.js";
import { prisma } from "../../services/database";
import { t } from "../../services/localization";
import { successEmbed, errorEmbed } from "../../utils/embed";

export const data = new SlashCommandBuilder()
    .setName("reaction-role-remove")
    .setNameLocalizations({ ko: t("commands.reaction-role-remove.name") })
    .setDescription("Remove a reaction role from a message")
    .setDescriptionLocalizations({ ko: t("commands.reaction-role-remove.description") })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addStringOption((option) =>
        option
            .setName("message_id")
            .setNameLocalizations({ ko: "메시지id" })
            .setDescription("The message ID to remove reaction role from")
            .setDescriptionLocalizations({ ko: t("commands.reaction-role-remove.options.message_id") })
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("emoji")
            .setNameLocalizations({ ko: "이모지" })
            .setDescription("The emoji to remove")
            .setDescriptionLocalizations({ ko: t("commands.reaction-role-remove.options.emoji") })
            .setRequired(true)
    );

export async function execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.guildId) {
        return interaction.reply({
            embeds: [errorEmbed(t("errors.guild_only"))],
            ephemeral: true,
        });
    }

    const messageId = interaction.options.getString("message_id", true);
    const emoji = interaction.options.getString("emoji", true);

    const reactionRole = await prisma.reactionRole.findUnique({
        where: {
            messageId_emoji: {
                messageId,
                emoji,
            },
        },
    });

    if (!reactionRole) {
        return interaction.reply({
            embeds: [errorEmbed(t("commands.reaction-role-remove.error_not_found"))],
            ephemeral: true,
        });
    }

    await prisma.reactionRole.delete({
        where: {
            id: reactionRole.id,
        },
    });

    return interaction.reply({
        embeds: [successEmbed(t("commands.reaction-role-remove.success"))],
        ephemeral: true,
    });
}
