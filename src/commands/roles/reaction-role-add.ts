import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    PermissionFlagsBits,
    Role,
    Message,
} from "discord.js";
import { prisma } from "../../services/database";
import { t } from "../../services/localization";
import { successEmbed, errorEmbed } from "../../utils/embed";

export const data = new SlashCommandBuilder()
    .setName("reaction-role-add")
    .setNameLocalizations({ ko: t("commands.reaction-role-add.name") })
    .setDescription("Add a reaction role to a message")
    .setDescriptionLocalizations({ ko: t("commands.reaction-role-add.description") })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addStringOption((option) =>
        option
            .setName("message_id")
            .setNameLocalizations({ ko: "메시지id" })
            .setDescription("The message ID to add reaction role")
            .setDescriptionLocalizations({ ko: t("commands.reaction-role-add.options.message_id") })
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("emoji")
            .setNameLocalizations({ ko: "이모지" })
            .setDescription("The emoji to use")
            .setDescriptionLocalizations({ ko: t("commands.reaction-role-add.options.emoji") })
            .setRequired(true)
    )
    .addRoleOption((option) =>
        option
            .setName("role")
            .setNameLocalizations({ ko: "역할" })
            .setDescription("The role to assign")
            .setDescriptionLocalizations({ ko: t("commands.reaction-role-add.options.role") })
            .setRequired(true)
    );

export async function execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.guildId || !interaction.channel) {
        return interaction.reply({
            embeds: [errorEmbed(t("errors.guild_only"))],
            ephemeral: true,
        });
    }

    const messageId = interaction.options.getString("message_id", true);
    const emoji = interaction.options.getString("emoji", true);
    const role = interaction.options.getRole("role", true) as Role;

    // Fetch the message
    let message: Message;
    try {
        message = await interaction.channel.messages.fetch(messageId);
    } catch (error) {
        return interaction.reply({
            embeds: [errorEmbed(t("commands.reaction-role-add.error_message_not_found"))],
            ephemeral: true,
        });
    }

    // Check if reaction role already exists
    const existing = await prisma.reactionRole.findUnique({
        where: {
            messageId_emoji: {
                messageId,
                emoji,
            },
        },
    });

    if (existing) {
        return interaction.reply({
            embeds: [errorEmbed(t("commands.reaction-role-add.error_already_exists"))],
            ephemeral: true,
        });
    }

    // Add reaction role to database
    await prisma.reactionRole.create({
        data: {
            guildId: interaction.guildId,
            messageId,
            channelId: interaction.channel.id,
            emoji,
            roleId: role.id,
        },
    });

    // Add reaction to message
    try {
        await message.react(emoji);
    } catch (error) {
        // Emoji might be invalid, but we still save it
        console.error("Failed to react:", error);
    }

    return interaction.reply({
        embeds: [successEmbed(t("commands.reaction-role-add.success", { emoji, role: role.toString() }))],
        ephemeral: true,
    });
}
