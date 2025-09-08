import { React, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import '../css/DiceRoller.css';



function DiceRoller() {

    const [dice, setDice] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [rollInfo, setRollInfo] = useState([0, 0, ""]);

    const BootstrapDiceButton = styled(Button)({
        color: orange[600],
        borderColor: orange[600],
        '&:hover': {
            color: orange[200],
            borderColor: orange[200],
        }
    });

    const handleClick = (location) => (e) => {
        if (e.nativeEvent.which === 1) {
            dice[location] += 1;
            setDice(dice);
        } else if (e.nativeEvent.which == 3) {
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
        const url = "http://localhost:5000/roll/dice";
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
            const cmd = e.target.value.split("/roll");
            const rollText = cmd.length > 1 ? cmd[1].trim() : cmd[0].trim();

            const url = "http://localhost:5000/roll/text";
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([rollText])
            }

            const response = await fetch(url, options);
            const roll = await response.json();
            setRollInfo(roll);
        }
    }

    useEffect(() => {
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
                                <BootstrapDiceButton variant="outlined" onClick={(e) => handleClick(0)(e)} onContextMenu={(e) => handleClick(0)(e)}>4</BootstrapDiceButton>
                                <BootstrapDiceButton variant="outlined" onClick={(e) => handleClick(1)(e)} onContextMenu={(e) => handleClick(1)(e)}>6</BootstrapDiceButton>
                                <BootstrapDiceButton variant="outlined" onClick={(e) => handleClick(2)(e)} onContextMenu={(e) => handleClick(2)(e)}>8</BootstrapDiceButton>
                                <BootstrapDiceButton variant="outlined" onClick={(e) => handleClick(3)(e)} onContextMenu={(e) => handleClick(3)(e)}>10</BootstrapDiceButton>
                                <BootstrapDiceButton variant="outlined" onClick={(e) => handleClick(4)(e)} onContextMenu={(e) => handleClick(4)(e)}>12</BootstrapDiceButton>
                                <BootstrapDiceButton variant="outlined" onClick={(e) => handleClick(5)(e)} onContextMenu={(e) => handleClick(5)(e)}>20</BootstrapDiceButton>
                                <BootstrapDiceButton variant="outlined" onClick={(e) => handleClick(6)(e)} onContextMenu={(e) => handleClick(6)(e)}>100</BootstrapDiceButton>
                            </Stack>
                        </div>
                        <div>
                            <BootstrapDiceButton variant="outlined" onClick={handleRoll}>Roll</BootstrapDiceButton>
                        </div>
                    </div>
                </div>
                <div className="TextContainer">
                    <div className="DiceTextChatAndBoxContainer">
                        <div className="DiceHistory">
                            <p>Dice Roll History</p>
                            <div className="RollText">
                                {/* <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p>
                                <p>DICE HISTORY</p> */}
                            </div>
                        </div>
                        <div className="DiceBoxContainer">
                            <div className="DiceTextbox">
                                <input type="text" className="DiceTextInput" placeholder="Enter Dice Roll Ex: /roll 3d6"
                                    onKeyDown={handleKeyDown} >
                                </input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DiceRoller;