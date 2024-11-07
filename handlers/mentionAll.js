

const mentionAll = async (client , message)=>{

    const chat = await message.getChat();

        if (chat.isGroup) {
            let text = '';
            let mentions = [];

            for (let participant of chat.participants) {
                let contact = await client.getContactById(participant.id._serialized);
                mentions.push(contact);
                text += `@${contact.number} `; // Construct message with mentions
            }

            await chat.sendMessage(text, { mentions }); // Send message with mentions
        } else {
        }

}



module.exports=mentionAll