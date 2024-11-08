const person = '213659575586'

async function bestPerson(client,message) {
    const chat = await message.getChat();
    let user ;

    for (let participant of chat.participants) if (participant.id.user===person) user = await client.getContactById(participant.id._serialized)

    console.log(user)
    await chat.sendMessage(`أفضل شخص في المجموعة هو 
@${user.id.user} ❄️✨`, {       
        mentions: [user]
    });
}

module.exports = bestPerson