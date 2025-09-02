import { React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import '../css/TabHeader.css';
import Tabs from './Tabs'

function TabHeader() {

    const [tab, setTab] = useState(0);


    const BootstrapDiceButton = styled(Button)({
        color: orange[600],
        borderColor: orange[600],
        '&:hover': {
            color: orange[200],
            borderColor: orange[200],
        }
    });


    const handleClick = (tabIndex) => (e) => {
        setTab(tabIndex);
    }

    return (
        <>
            <div>
                <div className="TabHeaderContainer">
                    <div className="TabHeader">
                        <Stack spacing={1} direction="row">
                            <BootstrapDiceButton variant="outlined" onClick={(e)=>handleClick(0)(e)}>Players</BootstrapDiceButton>
                            <BootstrapDiceButton variant="outlined" onClick={(e)=>handleClick(1)(e)}>NPCs</BootstrapDiceButton>
                            <BootstrapDiceButton variant="outlined" onClick={(e)=>handleClick(2)(e)}>Towns</BootstrapDiceButton>
                            <BootstrapDiceButton variant="outlined" onClick={(e)=>handleClick(3)(e)}>GM Notes</BootstrapDiceButton>
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