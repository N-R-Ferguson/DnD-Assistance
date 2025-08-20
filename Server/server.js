const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
let Roll = require('roll');
// const pool = require('./Connection');
const app = express();


app.use(cors());
app.use(express.json());

let roll = new Roll();

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
        if (i == text.length - 1) {
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
    for (var i = 0; i < dice.length; i++) {
        if (dice[i] != 0) {
            for (var j = 0; j < dice[i]; j++) {
                roll = Math.floor(Math.random() * (diceMaxValues[i])) + 1;
                rollSum += roll;
                rollList.push(roll);
            }
        }
        if (dice[i] > 0) {
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
    let rollText = req.body[0].trim();

    let regex1 = /[\d][A-Za-z][\d]|[0-9]/g;
    let regex2 = /[^A-Za-z0-9\s]/g
    let match1 = rollText.match(regex1);
    let match2 = rollText.match(regex2);

    let rolls = [];

    for (let i = 0; i < match1.length - 1; i++) {
        rolls.push(roll.roll(match1[i]).result)
    }

    sum = 0
    for (let i = 0; i < match2.length; i++) {
        if (i == 0) {
            if (match2[i] === '+') {
                sum += (rolls[0] + rolls[1]);
            } else {
                sum -= (rolls[0] + rolls[1]);
            }
        } else if (i == match2.length - 1) {
            if (match2[i] === '+') {
                sum += Number(match1[match1.length - 1]);
            } else {
                sum -= Number(match1[match1.length - 1]);
            }
        } else {
            if (match2[i] === '+') {
                sum += rolls[i + 1];
            } else {
                sum -= rolls[i + 1];
            }
        }
    }

    res.send([sum, rolls, rollText]);
});




app.listen(5000, () => {
    console.log('Server is running on port 5000');
});