const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

const person = '213659575586'

async function bestPerson(client,message) {
    const chat = await message.getChat();
    let user ;

    for (let participant of chat.participants) if (participant.id.user===person) user = await client.getContactById(participant.id._serialized)

    console.log(user)
    // Path to the specific .gif sticker file
    const gifStickerPath = path.join(__dirname, '../data/images', 'best-person.jpg');
            
    // Check if the .gif file exists
    if (fs.existsSync(gifStickerPath)) {
        // Send the .gif as an image with the text as a caption
        const gifMedia = MessageMedia.fromFilePath(gifStickerPath);
        await chat.sendMessage(gifMedia, { caption: `أفضل شخص في المجموعة دون منازع هو 
@${user.id.user} ❄️✨` , mentions:[user]});
    } else {
        console.log('gossip-laugh.gif not found in the images directory.');
    }
}

module.exports = bestPerson