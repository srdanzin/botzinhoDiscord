const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment-timezone');
moment.locale('pt-BR')

app.get('/', function (req, res, next) {
  res.send(`Estou funcionando corretamente :)`);

});

function runWebsite(){

  app.listen(3000, ()=>{console.log(`[${moment().tz("America/Sao_Paulo").calendar()}] 馃憤 O servidor esta pronto!`)});

}
module.exports = runWebsite;