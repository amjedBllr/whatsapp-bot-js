//? handlers
let {mentionSender} = require('../handlers/salutationResponse')
let randomPoem = require('../handlers/randomPoem')
let mentionAll = require('../handlers/mentionAll')
let topTen = require('../handlers/topTen')





//? bots command key 
let key = 'ريتسو'
const messagesController = async (client,message) => {

    //* cheering the sender of the command !!

    if (message.body.includes('السلام عليكم'))await mentionSender(message)
    
    else if(message.body.includes(key)){
        if(message.body.slice(0,5)!==key) message.reply('ناديتني يا قلبي ؟ 🕷️✨')
        else{
            //* here all the commands !!
            if(message.body.includes('شعر')) await randomPoem(message)
            else if(message.body.includes('كل')) await mentionAll(client,message)
            else if(message.body.includes('توب 10')) await topTen(client,message)


        }
    }
    
    else return

}

module.exports = messagesController