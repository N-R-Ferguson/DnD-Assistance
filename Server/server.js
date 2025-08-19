const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const pool = require('./Connection');
const app = express();


app.use(cors());
app.use(express.json());

diceMaxValues = {
    0: 4,
    1: 6,
    2: 8,
    3: 10,
    4: 12,
    5: 20,
    6: 100
}

function combineText(text) {
    retText = "";
    for (let i = 0; i < text.length; i++) {
        if (i == text.length-1) {
            retText += `${text[i]}`;
        }
        else {
            retText += `${text[i]} + `;
        }

    }
    return retText;
}

function rollDice(dice) {
    let rollSum = 0;
    let rollList = []
    let rollTextList = []
    for (var i=0; i<dice.length; i++) {
        if (dice[i] !=0) {
            for (var j=0; j< dice[i]; j++) {
                roll = Math.floor(Math.random() * (diceMaxValues[i])) + 1;
                rollSum += roll;
                rollList.push(roll);
            }
        }
        if (dice[i] > 0){
            rollTextList.push(`${dice[i]}d${diceMaxValues[i]}`)
        }
    }
    let rollText = combineText(rollTextList);
    let rollInfo = [rollSum, rollList, rollText];
    return rollInfo;
}

app.get('/', (req, res) => {
    res.send('D&D Assistance Server is running');
});

app.post('/roll-dice', (req, res) => {
    dice = req.body;
    let rollInfo = rollDice(dice);
    console.log(rollInfo);
    res.send(rollInfo);
});

app.post('/text-roll', (req, res) => {
    let text = req.body;
    
    


    console.log(text);
    res.send('');
});




app.listen(5000, () => {
    console.log('Server is running on port 5000');
});