import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// import './DiceRoller.css';

function DiceRoller() {
 
    return (
        <>
            <div className="DiceRolling Container"> 
                <div className="DiceSelectorContainer">
                    <div className="DiceSelector">
                        <Stack spacering={2} direction="column">
                            <Button variant="outlined">4</Button>
                            <Button variant="outlined">6</Button>
                            <Button variant="outlined">8</Button>
                            <Button variant="outlined">10</Button>
                            <Button variant="outlined">12</Button>
                            <Button variant="outlined">20</Button>
                            <Button variant="outlined">100</Button>
                        </Stack>
                    </div>
                </div>
                <div className="DiceTextChatAndBoxContainer">
                    <div className="DiceTextChatContainer">
                        <div className="DiceTextChat">
                            <p>Dice Roll History</p>
                            <div className="DiceHistory"></div>
                        </div>
                    </div>
                    <div className="DiceBoxContainer">
                        <div className="DiceTextbox">
                            <input type="text" className="DiceTextInput" placeholder="Enter Dice Roll Here"></input>
                            <Button variant="outlined">Roll</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiceRoller;