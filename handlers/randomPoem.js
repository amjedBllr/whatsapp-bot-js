//? importing poems 
const poems = require('../data/poem')

const randomPoem = async (message)=>{
    let index = Math.floor(Math.random()*poems.length)

    let writer = poems[index][0]
    let poem = poems[index][1]
    
    message.reply(`من عيني 🕷️✨
يقول ${writer} :

${poem} ✨⛓️‍💥`)
}

module.exports = randomPoem
