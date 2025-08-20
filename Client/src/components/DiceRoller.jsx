import { React, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import '../css/DiceRoller.css';



function DiceRoller() {

    const [dice, setDice] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [rollInfo, setRollInfo] = useState([0, 0, ""]);

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

        setRollInfo(roll);

        setDice([0, 0, 0, 0, 0, 0, 0]);
    }

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            const cmd = e.target.value.slice(6);
            
            const url = "http://localhost:5000/text-roll";
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([cmd])
            }

            const response = await fetch(url, options);
            const roll = await response.json();
            setRollInfo(roll);
        }
    }

    useEffect(() => {
        console.log(rollInfo[1]);
        console.log("Roll Value: " + rollInfo[0] +
            "\nList of Rolls: " + rollInfo[1] +
            "\nRolls in Text: " + rollInfo[2]
        );

    });


    return (
        <>
            <div className="DiceContainer">
                <div className="DiceSelectorContainer">
                    <div className="DiceRollContainer">
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
                        <div>
                            <Button variant="outlined" onClick={handleRoll}>Roll</Button>
                        </div>
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
                            <div>
                                <div className="DiceTextbox">
                                    <input type="text" className="DiceTextInput" placeholder="Enter Dice Roll Ex: /roll 3d6"
                                        onKeyDown={handleKeyDown} >
                                    </input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DiceRoller;