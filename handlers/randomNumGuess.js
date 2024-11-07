

let targetNumber;
let timeout;
let gameMessageId;

// Function to start the game
async function startGame(message) {
    // Set up game state
    gameActive = true;
    targetNumber = Math.floor(Math.random() * 100) + 1;
    console.log('Target number:', targetNumber);

    // Send the game start message and store its ID
    const gameStartMessage = await message.reply('Guess the number between 1 and 100! You have 60 seconds.');
    gameMessageId = gameStartMessage.id._serialized; // Store the ID of the start message

    // Set a timeout to end the game after 60 seconds
    timeout = setTimeout(() => {
        endGame(message, false);
    }, 60000);
}

// Function to handle the user's guess
function handleGuess(message) {
    const guess = parseInt(message.body, 10);

    if (guess === targetNumber) {
        message.reply(`🎉 Correct! The number was ${targetNumber}. You won!`);
        endGame(message, true);
    } else {
        message.reply(`❌ Wrong guess. Try again!`);
    }
}

// Function to end the game
function endGame(message, won) {
    if (!won) {
        message.reply(`Time's up! The correct number was ${targetNumber}.`);
    }

    // Reset the game state
    gameActive = false;
    gameMessageId = null;
    clearTimeout(timeout);
}

function getMessageId(){
    return gameMessageId ;
}

module.exports={startGame,handleGuess,getMessageId}