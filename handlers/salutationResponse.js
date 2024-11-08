async function mentionSender(message) {
    const chat = await message.getChat();
    let user = await message.getContact();
    console.log(user.id.user , user)
    await chat.sendMessage(`و عليكم السلام و رحمة الله تعالى و بركاته 
منور(ة) ✨ @${user.id.user}`, {       
        mentions: [user]
    });
}

module.exports = { mentionSender }