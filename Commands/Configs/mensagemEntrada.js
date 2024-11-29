const Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();

module.exports = {
  name: "mensagementrada",
  aliases: ["me"],
  description: `Configure uma mensagem de boas vindas`,
  usage: "mensagementrada [titulo] [mensagem]",
  categories: "Configurações",
  run: async (client, message, args) => {

    let titleDir = `guild/${message.guild.id}/settings/welcome/titulo`;
    let messageDir = `guild/${message.guild.id}/settings/welcome/mensagem`;

    if (
      !message.member.permissions.has(
        Discord.PermissionFlagsBits.ManageChannels,
      )
    ) {
      return message.reply(
        `:x: Você precisa ter permissão de **gerenciar canais** para usar esse comando`,
      );
    }
   
    let titulo = new Discord.EmbedBuilder()
    .setDescription(`Qual o titulo de entrada?
    
    **Tags:**
    [username] - Mostra o nome do usuário.
    [usertag] - Mostra a tag do usuário.
    [userid] - Mostra o id do usuário.
    [servername] - Mostra o nome do servidor.
    [serverid] - Mostra o id do servidor.
    [contagem] - Mostra a contagem de membros do servidor.
    
    Exemplo: [servername]!`)

    await message.reply({embeds: [titulo]});
    let filter = (m) => m.author.id === message.author.id;
    let collector = message.channel.createMessageCollector({ filter, max: 1 });

    collector.on("collect", async (m) => {
      let title = m.content;
      await database.ref(titleDir).set(title);

      let mensagem = new Discord.EmbedBuilder()
      .setDescription(`Qual a mensagem de entrada?

      **Tags:**
      [username] - Mostra o nome do usuário.
      [usertag] - Mostra a tag do usuário.
      [userid] - Mostra o id do usuário.
      [servername] - Mostra o nome do servidor.
      [serverid] - Mostra o id do servidor.
      [contagem] - Mostra a contagem de membros do servidor.

      Exemplo: Seja bem-vindo [username]! Você é o membro [contagem]!`)
      await m.reply({ embeds: [mensagem]});
      let filter = (m) => m.author.id === message.author.id;
      let collector = message.channel.createMessageCollector({
        filter,
        max: 1,
      });
      
      collector.on("collect", async (m) => {
        let message = m.content;
        await database.ref(messageDir).set(message);
        let sucesso = new Discord.EmbedBuilder()
        .setTitle(title)
        .setDescription(message)
        await m.reply({ content: `Mensagem de entrada configurada com sucesso.`, embeds: [sucesso]});
      });
    });
  },
};
