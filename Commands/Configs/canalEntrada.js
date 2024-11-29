const Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();

module.exports = {
  name: "setarentrada",
  aliases: ['se'],
  description: `Configure um canal de boas vindas`,
  usage: "setarentrada [canal]",
    categories: "Configurações",
  run: async (client, message, args) => {
    let channelDir = `guild/${message.guild.id}/settings/welcome/canal`

    const canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    
    if (!canal) return message.reply(`**Mencione um canal de texto para setar como canal de boas vindas!**`)
    
      if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
              return message.reply(`:x: Você precisa ter permissão de **gerenciar canais** para usar esse comando`)
          }

    message.reply(`✅ Canal de boas vindas setado com sucesso`)
    database.ref(channelDir).set(canal.id)
  },
};
