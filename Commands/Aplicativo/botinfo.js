const Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();

module.exports = {
  name: "botinfo",
  aliases: ["infobot"],
  description: `Minhas informações`,
  usage: 'botinfo',
  categories: 'Aplicativo',
  run: async (client, message, args) => {
    let PREFIX = '?'
    let ID_BOT = client.user.id
    let totalSeconds = (client.uptime / 1000);
let dias = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let horas = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutos = Math.floor(totalSeconds / 60);
let secundos = Math.floor(totalSeconds % 60)

    let UPTIME = `${dias}D ${horas}H ${minutos}M ${secundos}S`

    let painel = new Discord.EmbedBuilder()
.setDescription(`Me chamo ${client.user.username}, estou em fase de desenvolvimento.`)
.addFields({
name: `ID:`,
value: ID_BOT,
},
{
name: `Prefixo:`,
value: PREFIX,
},
{
name: `Tempo ligado:`,
value: UPTIME,
})


    return message.reply({ embeds: [painel] })

    
    
  }
}