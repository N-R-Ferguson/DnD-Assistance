import { react, useEffect, useState } from 'react';

function Tabs({ tabID=0 }) {

    console.log(`Tab Function: ${tabID}`);

    switch (tabID) {
        case 0:
            return (
                <>
                    <div>
                        <h2>Players</h2>
                    </div>
                </>
            );
        case 1:
            return (
                <>
                    <div>
                        <h2>NPCs</h2>
                    </div>
                </>
            );
        case 2:
            return (
                <>
                    <div>
                        <h2>Towns</h2>
                    </div>
                </>
            );
        case 3:
            return (
                <>
                    <div>
                        <h2>GM Notes</h2>
                    </div>
                </>
            );
            ;
        default:
            return (
                <>
                    <div>
                        <h2>Not Working</h2>
                    </div>
                </>
            );
    }

}

export default Tabs;