import { React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import '../css/TabHeader.css';

function TabHeader() {

    const [tab, setTab] = useState(0);


    useEffect(() => {
        console.log(`Current tab: ${tab}`);
    },[]);


    const handleClick = (tabIndex) => (e) => {
        setTab(tabIndex);
        console.log(tabIndex);
    }



    return (
        <>
            <div>
                <div className="TabHeaderContainer">
                    <div className="TabHeader">
                        <Stack spacing={0} direction="row">
                            <Button variant="outlined" onClick={(e)=>handleClick(0)(e)}>Players</Button>
                            <Button variant="outlined" onClick={(e)=>handleClick(1)(e)}>NPCs</Button>
                            <Button variant="outlined" onClick={(e)=>handleClick(2)(e)}>Towns</Button>
                            <Button variant="outlined" onClick={(e)=>handleClick(3)(e)}>GM Notes</Button>
                        </Stack>
                    </div>
                </div>
                <div className='DisplayContainer'>
                    <div>
                        <h2>Notes and Players</h2>
                        <p>This section will contain notes and player information.</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TabHeader;