import { React, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import '../css/DiceRoller.css';



function DiceRoller() {

    const [dice, setDice] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [diceTextComd, setDiceTextCmd] = useState(null);

    useEffect(() => {
        console.log("Current Dice", dice);
    }, []);

    const handleClick = (location) => (e) => {
        if (e.nativeEvent.which === 1) {
            console.log("Left Click!!!");
            dice[location] += 1;
            setDice(dice);

        } else if (e.nativeEvent.which == 3) {
            console.log("Right Click!!!");
            dice[location] -= 1;
            setDice(dice);

        }

        if (dice[location] <= 0) {
            dice[location] = 0;
            setDice(dice);
        }
    }

    const handleMenu = (e) => e.preventDefault();


    const handleRoll = async () => {
        const body = dice;
        const url = "http://localhost:5000/roll-dice";
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }

        const response = await fetch(url, options);
        const roll = await response.json();
        const rollValue = roll[0];
        const rollList = roll[1];
        const rollText = roll[2];
        setDice([0, 0, 0, 0, 0, 0, 0]);
    }


    return (
        <>
            <div className="DiceContainer">
                <div className="DiceSelectorContainer">
                    <div className="DiceSelector" onContextMenu={handleMenu}>
                        <Stack spacing={1} direction="column">
                            <Button variant="outlined" onClick={(e) => handleClick(0)(e)} onContextMenu={(e) => handleClick(0)(e)}>4</Button>
                            <Button variant="outlined" onClick={(e) => handleClick(1)(e)} onContextMenu={(e) => handleClick(1)(e)}>6</Button>
                            <Button variant="outlined" onClick={(e) => handleClick(2)(e)} onContextMenu={(e) => handleClick(2)(e)}>8</Button>
                            <Button variant="outlined" onClick={(e) => handleClick(3)(e)} onContextMenu={(e) => handleClick(3)(e)}>10</Button>
                            <Button variant="outlined" onClick={(e) => handleClick(4)(e)} onContextMenu={(e) => handleClick(4)(e)}>12</Button>
                            <Button variant="outlined" onClick={(e) => handleClick(5)(e)} onContextMenu={(e) => handleClick(5)(e)}>20</Button>
                            <Button variant="outlined" onClick={(e) => handleClick(6)(e)} onContextMenu={(e) => handleClick(6)(e)}>100</Button>
                        </Stack>
                    </div>
                </div>
                <div>
                    <div className="DiceTextChatAndBoxContainer">
                        <div className="DiceHistory">
                            <p>Dice Roll History</p>
                            <div className="RollText">
                            </div>
                        </div>
                        <div className="DiceBoxContainer">
                            <div className="DiceTextbox">
                                <input type="text" className="DiceTextInput" placeholder="Enter Dice Roll Here"></input>
                                <Button variant="outlined" onClick={handleRoll}>Roll</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DiceRoller;