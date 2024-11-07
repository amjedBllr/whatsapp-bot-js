const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    if (message.body === '!mentionall') { // Trigger command
        const chat = await message.getChat();

        if (chat.isGroup) {
            let text = '';
            let mentions = [];

            for (let participant of chat.participants) {
                const contact = await client.getContactById(participant.id._serialized);
                mentions.push(contact);
                text += `@${contact.number} `; // Construct message with mentions
            }

            await chat.sendMessage(text, { mentions }); // Send message with mentions
        } else {
            message.reply("This command can only be used in group chats.");
        }
    }
});

client.initialize();
