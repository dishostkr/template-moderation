import { GuildMember, TextChannel, PartialGuildMember } from "discord.js";
import { prisma } from "../services/database";
import { t } from "../services/localization";
import { createEmbed } from "../utils/embed";

export async function handleGuildMemberRemove(member: GuildMember | PartialGuildMember) {
    const guildConfig = await prisma.guild.findUnique({
        where: { id: member.guild.id },
    });

    if (!guildConfig || !guildConfig.leaveChannelId) return;

    const channel = member.guild.channels.cache.get(guildConfig.leaveChannelId) as TextChannel;

    if (!channel) return;

    const message = (guildConfig.leaveMessage || t("events.member_leave.default_message"))
        .replace(/{user}/g, member.toString())
        .replace(/{username}/g, member.user.username)
        .replace(/{server}/g, member.guild.name);

    const embed = createEmbed("warning")
        .setTitle("Goodbye 👋")
        .setDescription(message)
        .setThumbnail(member.user.displayAvatarURL());

    await channel.send({ embeds: [embed] });
}
