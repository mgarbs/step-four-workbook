// Resentments.js
import React from 'react';
import StepFourWorksheet from '../components/StepFourWorksheet';

const sexConductInstructions = (
    <>
        <h2>INSTRUCTIONS FOR COMPLETION</h2>
        <ol>
            <li>We listed all people we harmed. (Complete Column 1 from top to bottom. Do nothing on Columns 2, 3 or 4 until Column 1 is complete.)</li>
            <li>We asked ourselves what WE did. (Complete Column 2 from top to bottom. Do nothing on Columns 3, or 4 until Column 2 is complete.)</li>
            <li>Was it our self-esteem, our security, our ambitions, our sex instinct which caused the harm? (Complete each column within Column 3 going from top to bottom. Starting with the Self-Esteem Column and finishing with the Sexual Ambitions Column. Do nothing on Column 4 until Column 3 is complete.)</li>
            <li>Referring to our list again. Putting out of our minds the wrongs others had done, we resolutely looked for our own mistakes. Where had we been selfish, dishonest, self-seeking and frightened and inconsiderate? (Asking ourselves the above questions we complete each column within Column 4.)</li>
            <li>Reading from left to right, we now see the harm (Column 1), what we did (Column 2), the part of self which caused the harm (Column 3), and the exact nature of the defect within us that caused the harm, and block us off from God's will (Column 4).</li>
        </ol>
    </>
);

function SexConduct() {
    return (
        <StepFourWorksheet
            title="Review of Our Own Sex Conduct"
            storageKey="sexConductEntries"
            columnOneLabel="Who did I harm?"
            columnTwoLabel="What did I do?"
            instructions={sexConductInstructions}
        />
    );
}

export default SexConduct;
