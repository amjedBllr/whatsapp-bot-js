const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

const gossip = async (client, message) => {
    const bads = ['غبي', 'تافه', 'عاق', 'رح يبقى وحيد للأبد', 'ما يعرف يتكلم', 'بشع ألف', 'ما يستاهل خير', 'ما يعرف يسوي شيء'];
    try {
        const chat = await message.getChat();

        if (chat.isGroup) {
            let users = [];
            let mentions = [];

            // Shuffle and select two random participants
            const participants = chat.participants;
            const shuffledParticipants = participants.sort(() => 0.5 - Math.random());
            const randomParticipants = shuffledParticipants.slice(0, 2);

            // Get contact details for the two selected participants
            for (let participant of randomParticipants) {
                const contact = await client.getContactById(participant.id._serialized);
                users.push(contact.number);
                mentions.push(contact); // Add the contact to mentions for WhatsApp
            }

            // Randomize something mean
            const meanIndex = Math.floor(Math.random() * bads.length);
            // Construct and send the message with mentions
            const text = `وللللللل ، @${users[0]} قال عن @${users[1]} ${bads[meanIndex]} 😬😂\nصح هذا الكلام ؟ 👀🕷️`;

            // Path to the specific .gif sticker file
            const gifStickerPath = path.join(__dirname, '../data/images', 'laughing.gif');
            
            // Check if the .gif file exists
            if (fs.existsSync(gifStickerPath)) {
                // Send the .gif as an image with the text as a caption
                const gifMedia = MessageMedia.fromFilePath(gifStickerPath);
                await chat.sendMessage(gifMedia, { caption: text , mentions:mentions});
            } else {
                console.log('gossip-laugh.gif not found in the images directory.');
            }

        } else {
            console.log("This command only works in group chats.");
        }
    } catch (error) {
        console.error("Error in gossip function:", error);
    }
};

module.exports = gossip;
