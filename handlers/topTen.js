

const topTen = async (client , message)=>{
    

    const chat = await message.getChat();

        if (chat.isGroup) {
            let text = message.body.match(/توب.*?(?=,|\.|،|\n|$)/i);

            text+=` ...
`

            let mentions = [];

            let participants = chat.participants
            const shuffledParticipants = participants.sort(() => 0.5 - Math.random());
            const randomParticipants = shuffledParticipants.slice(0, 10); 

            let counter = 1
            for (let participant of randomParticipants) {
                let contact = await client.getContactById(participant.id._serialized);
                mentions.push(contact);
                text += `✨ ${counter} : @${contact.number}
`; // Construct message with mentions
                counter++ ;
            }

            await chat.sendMessage(text, { mentions }); // Send message with mentions
        } else {
        }

}



module.exports=topTen