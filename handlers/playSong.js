const { MessageMedia } = require('whatsapp-web.js')
const axios = require('axios')

async function playSong(client, message) {

    const url = message.body.split(' شغل ')[1].trim();
    console.log(url)

    const apiUrl = `https://example-api.com/convert?url=${url}`;
        
        try {
            const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
            const audioMedia = new MessageMedia('audio/mp3', response.data.toString('base64'), 'audio.mp3');
            await client.sendMessage(message.from, audioMedia, { sendAudioAsVoice: true });
        } catch (error) {
            console.error('API Error:', error);
            message.reply('Error fetching or converting the video.');
        }
    
}

module.exports = playSong