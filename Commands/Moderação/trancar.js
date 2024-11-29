const Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();

module.exports = {
  name: "trancar",
  aliases: ['lock'],
  description: `tranque um canal de conversa`,
  usage: "trancar (canal)",
    categories: "Moderação",
  run: async (client, message, args) => {
    const channel = message.mentions.channels.first() || message.channel;
    const perms = message.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)
   if (!perms) return message.reply("opa")

    channel.permissionOverwrites.create(message.guild.id, { SendMessages: false })

    channel.send(`:lock:  O canal ${channel} foi trancando com sucesso.`)
      
   
  },
};
