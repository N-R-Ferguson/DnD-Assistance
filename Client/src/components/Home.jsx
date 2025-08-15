import React from 'react';
import DiceRoller from './DiceRoller';
import NotesAndPlayers from './NotesAndPlayers';
import '../css/Home.css'

function Home() {
    return (
        <>

            <div className="ComponentsContainer">
                
                <div className="DiceRollerContainer">
                    <DiceRoller />
                </div>


                <div className="NotesAndPlayersContainer">
                    <NotesAndPlayers />
                </div>

            </div>


        </>
    )
}

export default Home;