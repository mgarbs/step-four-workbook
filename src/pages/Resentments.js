// Resentments.js
import React from 'react';
import StepFourWorksheet from '../components/StepFourWorksheet';

const resentmentInstructions = (
    <>
        <h2>INSTRUCTIONS FOR COMPLETION</h2>
        <ol>
            <li>In dealing with resentments we set them on paper. We listed people, institutions or principles with whom we were angry. Complete Column 1 from top to bottom. Do nothing on Columns 2, 3 or 4 until Column 1 is complete.</li>
            <li>We asked ourselves why we were angry. Complete Column 2 from top to bottom. Do nothing on Columns 3, or 4 until Column 2 is complete.</li>
            <li>On our grudge list we set opposite each name our injuries. Was it our self-esteem, our security, our ambitions, our personal or sex relations which had been interfered with? Complete each column within Column 3 going from top to bottom. Starting with the Self-Esteem Column and finishing with the Sexual Ambitions Column. Do nothing on Column 4 until Column 3 is complete.</li>
            <li>Referring to our list again. Putting out of our minds the wrongs others had done, we resolutely looked for our own mistakes. Where had we been selfish, dishonest, self-seeking and frightened and inconsiderate? (Asking ourselves the above questions we complete each column within Column 4.)</li>
            <li>Reading from left to right, we now see the resentment (Column 1), the cause (Column 2), the part of self that had been affected (Column 3), and the exact nature of the defect within us that allowed the resentment to surface and block us off from God's will (Column 4).</li>
        </ol>
    </>
);

function Resentments() {
    return (
        <StepFourWorksheet
            title="Review of Resentments"
            storageKey="resentmentsEntries"
            columnOneLabel="I'm resentful at"
            columnTwoLabel="The cause"
            instructions={resentmentInstructions}
        />
    );
}

export default Resentments;
