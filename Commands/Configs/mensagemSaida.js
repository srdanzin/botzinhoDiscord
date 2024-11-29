const Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();

module.exports = {
  name: "mensagemsaida",
  aliases: ["ms"],
  description: `Configure uma mensagem de adeus`,
  usage: "mensagemsaida",
  categories: "Configurações",
  run: async (client, message, args) => {

    let titleDir = `guild/${message.guild.id}/settings/bye/titulo`;
    let messageDir = `guild/${message.guild.id}/settings/bye/mensagem`;

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
    .setDescription(`Qual o titulo de adeus?
    
    **Tags:**
    [username] - Mostra o nome do usuário.
    [usertag] - Mostra a tag do usuário.
    [userid] - Mostra o id do usuário.
    [servername] - Mostra o nome do servidor.
    [serverid] - Mostra o id do servidor.
    [contagem] - Mostra a contagem de membros do servidor.
    
    Exemplo: Adeus [usertag]!`)

    await message.reply({embeds: [titulo]});
    let filter = (m) => m.author.id === message.author.id;
    let collector = message.channel.createMessageCollector({ filter, max: 1 });

    collector.on("collect", async (m) => {
      let title = m.content;
      await database.ref(titleDir).set(title);

      let mensagem = new Discord.EmbedBuilder()
      .setDescription(`Qual a mensagem de adeus?

      **Tags:**
      [username] - Mostra o nome do usuário.
      [usertag] - Mostra a tag do usuário.
      [userid] - Mostra o id do usuário.
      [servername] - Mostra o nome do servidor.
      [serverid] - Mostra o id do servidor.
      [contagem] - Mostra a contagem de membros do servidor.

      Exemplo: Iremos sentir saudades :(`)
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
        await m.reply({ content: `Mensagem de adeus configurada com sucesso.`, embeds: [sucesso]});
      });
    });
  },
};
