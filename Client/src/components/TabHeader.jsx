import { React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import '../css/TabHeader.css';
import Tabs from './Tabs'

function TabHeader() {

    const [tab, setTab] = useState(0);


    const handleClick = (tabIndex) => (e) => {
        setTab(tabIndex);
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
                    <Tabs tabID={tab}/>
                </div>

            </div>
        </>
    )
}

export default TabHeader;