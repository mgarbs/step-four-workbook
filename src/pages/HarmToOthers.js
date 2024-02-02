// Resentments.js
import React from 'react';
import StepFourWorksheet from '../components/StepFourWorksheet';

function HarmToOthers() {
    return (
        <StepFourWorksheet
            title="Review of Harms Other Than Sexual"
            storageKey="harmToOthersEntries"
            columnOneLabel="Who did I harm?"
            columnTwoLabel="What did I do?"
        />
    );
}

export default HarmToOthers;
