//? libs

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

//? controllers
const messagesController = require('./controllers/messagesController')

const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready',async () => {

    console.log('Client is ready!');

});

client.on('message', async message => messagesController(client,message));

client.initialize();

module.exports=client