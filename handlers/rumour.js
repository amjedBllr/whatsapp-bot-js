const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');
const rumours = require('../data/rumours')

const rumour = async (client, message) => {
    try {
        console.log('running...')
        const chat = await message.getChat();

        if (chat.isGroup) {
            let user ;
            let mention ;

            // Shuffle and select two random participants
            const participants = chat.participants;

            // first random index
            let i = Math.floor(Math.random() * participants.length)

            // Get contact details for the selected participant
            const contact = await client.getContactById(participants[i].id._serialized);
            user = contact.number;
            mention = contact; // Add the contact to mentions for WhatsApp

            i = Math.floor(Math.random()*rumours.length)

            // Construct and send the message with mentions
            const text = `@${user} ، سمعت أنك ${rumours[i]}
صحيح هذا الشيء ؟ 👀`
            // Path to the specific .gif sticker file
            const gifStickerPath = path.join(__dirname, '../data/images', 'sarcastic_laugh.jpg');

            // Check if the .gif file exists
            if (fs.existsSync(gifStickerPath)) {
                // Send the .gif as an image with the text as a caption
                const gifMedia = MessageMedia.fromFilePath(gifStickerPath);
                await chat.sendMessage(gifMedia, { caption: text, mentions: mention });
            } else {
                console.log('haha.gif not found in the images directory.');
            }

        } else {
            console.log("This command only works in group chats.");
        }
    } catch (error) {
        console.error("Error in randomLove function:", error);
    }
};

module.exports = rumour;
