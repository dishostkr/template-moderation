"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildMemberRemove = handleGuildMemberRemove;
const database_1 = require("../services/database");
const localization_1 = require("../services/localization");
const embed_1 = require("../utils/embed");
async function handleGuildMemberRemove(member) {
    const guildConfig = await database_1.db.guild.findUnique({
        where: { id: member.guild.id },
    });
    if (!guildConfig || !guildConfig.leaveChannelId)
        return;
    const channel = member.guild.channels.cache.get(guildConfig.leaveChannelId);
    if (!channel)
        return;
    const message = (guildConfig.leaveMessage || (0, localization_1.t)("events.member_leave.default_message"))
        .replace(/{user}/g, member.toString())
        .replace(/{username}/g, member.user.username)
        .replace(/{server}/g, member.guild.name);
    const embed = (0, embed_1.createEmbed)("warning")
        .setTitle("Goodbye 👋")
        .setDescription(message)
        .setThumbnail(member.user.displayAvatarURL());
    await channel.send({ embeds: [embed] });
}
