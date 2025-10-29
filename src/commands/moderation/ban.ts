import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    PermissionFlagsBits,
    GuildMember,
} from "discord.js";
import { db } from "../../services/database";
import { t } from "../../services/localization";
import { successEmbed, errorEmbed } from "../../utils/embed";

export const data = new SlashCommandBuilder()
    .setName("ban")
    .setNameLocalizations({ ko: t("commands.ban.name") })
    .setDescription("Ban a member from the server")
    .setDescriptionLocalizations({ ko: t("commands.ban.description") })
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
        option
            .setName("user")
            .setNameLocalizations({ ko: "유저" })
            .setDescription("The user to ban")
            .setDescriptionLocalizations({ ko: t("commands.ban.options.user") })
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("reason")
            .setNameLocalizations({ ko: "사유" })
            .setDescription("Reason for ban")
            .setDescriptionLocalizations({ ko: t("commands.ban.options.reason") })
            .setRequired(false)
    )
    .addIntegerOption((option) =>
        option
            .setName("delete_days")
            .setNameLocalizations({ ko: "삭제일수" })
            .setDescription("Delete message history (0-7 days)")
            .setDescriptionLocalizations({ ko: t("commands.ban.options.delete_days") })
            .setRequired(false)
            .setMinValue(0)
            .setMaxValue(7)
    );

export async function execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.guildId || !interaction.guild) {
        return interaction.reply({
            embeds: [errorEmbed(t("errors.guild_only"))],
            ephemeral: true,
        });
    }

    const targetUser = interaction.options.getUser("user", true);
    const reason = interaction.options.getString("reason") || "No reason provided";
    const deleteDays = interaction.options.getInteger("delete_days") || 0;

    const executor = interaction.member as GuildMember;

    // Check if target is the executor
    if (targetUser.id === interaction.user.id) {
        return interaction.reply({
            embeds: [errorEmbed(t("commands.ban.error_self"))],
            ephemeral: true,
        });
    }

    // Try to fetch member (they might not be in server)
    let targetMember: GuildMember | null = null;
    try {
        targetMember = await interaction.guild.members.fetch(targetUser.id);
    } catch (error) {
        // User not in server, can still ban by ID
    }

    // Check role hierarchy if member exists
    if (targetMember) {
        if (targetMember.roles.highest.position >= executor.roles.highest.position) {
            return interaction.reply({
                embeds: [errorEmbed(t("commands.ban.error_hierarchy"))],
                ephemeral: true,
            });
        }

        const botMember = await interaction.guild.members.fetchMe();
        if (targetMember.roles.highest.position >= botMember.roles.highest.position) {
            return interaction.reply({
                embeds: [errorEmbed(t("commands.ban.error_bot_hierarchy"))],
                ephemeral: true,
            });
        }
    }

    try {
        // Ban the user
        await interaction.guild.members.ban(targetUser.id, {
            reason,
            deleteMessageSeconds: deleteDays * 24 * 60 * 60,
        });

        // Ensure guild record exists (avoid foreign key violations)
        await db.guild.upsert({
            where: { id: interaction.guildId },
            update: {},
            create: { id: interaction.guildId },
        });

        // Log to database
        await db.moderationLog.create({
            data: {
                guildId: interaction.guildId,
                moderatorId: interaction.user.id,
                targetId: targetUser.id,
                action: "ban",
                reason,
            },
        });

        return interaction.reply({
            embeds: [successEmbed(t("commands.ban.success", { user: targetUser.tag, reason }))],
        });
    } catch (error) {
        console.error("Ban error:", error);
        return interaction.reply({
            embeds: [errorEmbed(t("errors.unknown_error"))],
            ephemeral: true,
        });
    }
}
