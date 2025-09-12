const express = require('express');
const cors = require('cors');
const multer = require('multer');
let Roll = require('roll');
const fs = require('fs');
const pool = require('./db');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const diceMaxValues = {
    0: 4,
    1: 6,
    2: 8,
    3: 10,
    4: 12,
    5: 20,
    6: 100
}

const tabs = {
    0: 'players',
    1: 'npcs',
    2: 'towns',
    3: 'gm_notes'
}

var roller = new Roll();

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
    let roll = 0;
    let rollSum = 0;
    let rollList = ""
    let rollTextList = []
    for (var i = 0; i < dice.length; i++) {
        if (dice[i] != 0) {
            for (var j = 0; j < dice[i]; j++) {
                roll = Math.floor(Math.random() * (diceMaxValues[i])) + 1;
                rollSum += roll;
                rollList = rollList + roll + " ";
            }
        }
        if (dice[i] > 0) {
            rollTextList.push(`${dice[i]}d${diceMaxValues[i]}`)
        }
    }
    let rollText = combineText(rollTextList);
    let rollInfo = [rollSum, rollList.trim(), rollText];
    return rollInfo;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const tab = tabs[req.body.Tab];
        const __dir = `./uploads/${tab}`

        if (!fs.existsSync(__dir)) {
            fs.mkdirSync(__dir);
        }
        
        cb(null, __dir);
        
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage: storage 
});


async function addRollTODatabase(rollInformation) {
    console.log(rollInformation);

    const query = "INSERT INTO rolls (roll, rollOutput, rollBreakDown) VALUES ($1, $2, $3)";
    
    await pool.query(query, [rollInformation[0], rollInformation[1], rollInformation[2]]);
}






app.get('/', (req, res) => {
    res.send('D&D Assistance Server is running');
});

app.get('/rolls', async (req, res) => {

    const query = "SELECT * FROM rolls ORDER BY rollID DESC LIMIT 20";

    const response = await pool.query(query, []);


    res.send(response.rows);
});

app.get('/files', (req, res) => {
    res.send('Notes Page')
});



app.post('/roll/dice', (req, res) => {
    dice = req.body;
    let rollInfo = rollDice(dice);

    addRollTODatabase(rollInfo)
    .then(console.log('Roll Added To Database'))
    .catch(err => console.log(err));

    res.send(rollInfo);
});

app.post('/roll/text', (req, res) => {
    let rollText = req.body[0];
    let rolls = [];
    let sum = -1;

    try {
        let regex1 = /[\d]+[A-Za-z][\d]+|[0-9]/g;
        let regex2 = /[^A-Za-z0-9\s]/g
        let match1 = rollText.match(regex1);
        let match2 = rollText.match(regex2);

        for (let i = 0; i < match1.length; i++) {

            rolls.push(roller.roll(match1[i]).result)
        }

        sum = rolls[0]

        if (match2.length > 1) {
            for (let i = 0; i < match2.length; i++) {
                if (match2[i] === '+') {
                    sum += (rolls[i + 1]);
                } else if (match2[i] === '-') {
                    sum -= (rolls[i + 1]);
                } else {
                    sum = "Roll syntax is incorrect.";
                    rolls = [];
                    break;
                }
            }
        }
    } catch (err) {
        console.log(err)
        console.log("Roll syntax is incorrect.");
        sum = "Roll syntax is incorrect.";
        rolls = [];
    }
    let diceRolls = ""
    for(let i=0; i < rolls.length; i++) {
        diceRolls = diceRolls + rolls[i] + " ";
    }
    diceRolls = diceRolls.trim()
    addRollTODatabase([sum, diceRolls, rollText])
    .then(console.log('Roll Added To Database'))
    .catch(err => console.log(err));

    res.send([sum, diceRolls, rollText]);
});


app.post('/upload/files', upload.any('files'), (req, res) => {
    res.send(['Files uploaded']);
});



app.listen(5000, () => {
    console.log('Server is running on port 5000');
});