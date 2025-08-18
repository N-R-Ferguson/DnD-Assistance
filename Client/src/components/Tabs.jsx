import Players from './Players';
import NPC from './NPC';
import Towns from './Towns';
import GmNotes from './GmNotes'

function Tabs({ tabID = 0 }) {

    console.log(`Tab Function: ${tabID}`);

    switch (tabID) {
        case 0:
            return (
                <>
                    <Players />
                </>
            );
        case 1:
            return (
                <>
                    <NPC />
                </>
            );
        case 2:
            return (
                <>
                    <Towns />
                </>
            );
        case 3:
            return (
                <>
                    <GmNotes />
                </>
            );
            ;
        default:
            return (
                <>
                    <h2>Not Working</h2>
                </>
            );
    }

}

export default Tabs;