// Resentments.js
import React from 'react';
import StepFourWorksheet from '../components/StepFourWorksheet';

function Resentments() {
    return (
        <StepFourWorksheet
            title="Review of Resentments"
            storageKey="resentmentsEntries"
            columnOneLabel="I'm resentful at"
            columnTwoLabel="The cause"
        />
    );
}

export default Resentments;