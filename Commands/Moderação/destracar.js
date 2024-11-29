const Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();

module.exports = {
  name: "destrancar",
  aliases: ["unlock"],
  description: `destranque um canal de conversa`,
  usage: "destrancar (canal)",
    categories: "Moderação",
  run: async (client, message, args) => {
    const channel = message.mentions.channels.first() || message.channel;
    const perms = message.member.permissions.has(
      Discord.PermissionFlagsBits.ManageChannels,
    );
    if (!perms) return message.reply("opa");

    channel.permissionOverwrites.create(message.guild.id, {
      SendMessages: true,
    });

    channel.send(`:unlock: O canal ${channel} foi liberado para conversar`);
  },
};
