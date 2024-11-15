const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

async function loveYouToo(client, message) {
    // Path to the specific image file
    const gifStickerPath = path.join(__dirname, '../data/images', 'nomal.jpg');
    
    // Check if the image file exists
    if (fs.existsSync(gifStickerPath)) {
        // Send the image with text as a caption and as a reply
        const gifMedia = MessageMedia.fromFilePath(gifStickerPath);
        await client.sendMessage(message.from, gifMedia, {
            caption: `و انا أحبك بعد 🕷️✨`,
            quotedMessageId: message.id._serialized
        });
    } else {
        console.log('Image not found in the images directory.');
    }
}

module.exports = loveYouToo;
