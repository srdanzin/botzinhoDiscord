const admin = require("firebase-admin");
const moment = require('moment-timezone');
moment.locale('pt-BR')
var serviceAccount = require("./serviceAccountKey.json");


module.exports = () => {

  try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://testeteste-17ed7-default-rtdb.firebaseio.com/'
});
    console.log(`[${moment().tz("America/Sao_Paulo").calendar()}] Firebase Realtime Database foi Conectado com Sucesso!`);
    return admin.database();
  } catch (error) {    
console.log(`[${moment().tz("America/Sao_Paulo").calendar()}] Ocorreu um Erro ao Conectar ao Firebase Realtime Database:\n${error}`);
    return null
  };
}
