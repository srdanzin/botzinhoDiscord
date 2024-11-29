const Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();
const { readdirSync } = require("fs");

module.exports = {
  name: "pesquisar",
  aliases: [],
  description: `Pesquise um comando`,
  usage: "pesquisar [comando]",
  categories: "Aplicativo",
  run: async (client, message, args) => {
    let prefix = "?";

    let pesquisa = args.join(" ");
    if (!pesquisa)
      return message.reply(
        "Você precisa me dizer o comando que você quer pesquisar!",
      );
    let cmds =
      client.commands.get(pesquisa) ||
      client.commands.get(client.aliases.get(pesquisa));
    if (!cmds) return message.reply("não achei nenhum comando com esse nome!");
    let embed = new Discord.EmbedBuilder()
      .setTitle(`🔎 | Pesquisa`)
      .setDescription(`**Nome:** ${cmds.name}\n**Aliases:** ${cmds.aliases.join(", ") || "Não tem aliases"}\n**Descrição:** ${cmds.description}\n**Categoria:** ${cmds.categories}\n**Uso:** ${prefix}${cmds.usage}`)
      .setColor(0x2f3136)
    .setFooter({ text: `[] = Obrigatório | () = Opcional`})
    return message.reply({ embeds: [embed] });
  },
};
