let Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();
const ms = require("../../Utils/parsems");
const moment = require("moment-timezone");
moment.locale("pt-BR");

module.exports = {
  name: "roubar",
  aliases: ["rob"],
  description: "Roube uma quantia de alguém!",
  usage: "roubar [@user]",
  categories: "Economia",

  run: async (client, message, guild, args) => {

let user = message.mentions.members.first()
    let cooldown = await database.ref(`user/${message.author.id}/cooldowns/roubo`).once('value')
  cooldown = cooldown.val() || 0

  let timeout = 10800000;
  if(timeout - (Date.now() - cooldown) > 0) {
    let time = ms(timeout - (Date.now() - cooldown));

    return message.reply({ content: `**🚫 Você já roubou alguem hoje!\nVolte em: ${time.hours} hora(s), ${time.minutes} minutos, e ${time.seconds} segundos.**` })
  }

  if (!user) return message.reply({ content: `**Você não disse quem vai roubar! :eyes:**` })

  if (user.id == client.user.id) return message.reply({ content: `**Você não pode me roubar :kissing_heart:**` }) 

  if (user.id === message.author.id) return message.reply({ content: `**Você não pode roubar você mesmo**` })  
  
  let money_author = await database.ref(`user/${message.author.id}/economy/dinheiro`).once('value');
  money_author = money_author.val() || 0
  console.log(money_author)

  let money_user = await database.ref(`user/${user.id}/economy/dinheiro`).once('value');
  money_user = money_user.val() || 0

  if (money_user < 200) return message.reply({ content: `**Você só consegue roubar o(a) ${user.user.tag}\nSe ele(a) tiver 200 Dinheiros ou mais em mãos**` })

  let random = Math.floor(Math.random() * 200) + 50;
  let porcentagem = Math.floor(Math.random() * 100)

  if(porcentagem < 50) {
    
    await database.ref(`user/${message.author.id}/cooldowns/roubo`).set(Date.now())
          
    await database.ref(`user/${message.author.id}/economy/dinheiro`).set(money_author - random)      

    return message.reply({ content: `**Você tentou roubar o(a) ${user.tag} e falhou\n👮 Foi levado(a) para a prisão e perdeu ${random} Dinheiros\n\nIsso é para aprender a não roubar o dinheiro e coisas das pessoas >:(**` })
    

  } else {

    await database.ref(`user/${message.author.id}/cooldowns/roubo`).set(Date.now())

    await database.ref(`user/${user.id}/economy/dinheiro`).set(money_user - random)

    await database.ref(`user/${message.author.id}/economy/dinheiro`).set(money_author + random)

    return message.reply({ content: `**:white_check_mark: Você roubou ${random} Dinheiros de ${user.tag} com sucesso**` })
  }
  }

}