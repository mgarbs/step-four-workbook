// Resentments.js
import React from 'react';
import StepFourWorksheet from '../components/StepFourWorksheet';

const fearInstructions = (
    <>
        <h2>INSTRUCTIONS FOR COMPLETION</h2>
        <ol>
            <li>In dealing with fears we put them on paper. We listed people, institutions or principles with who we were fearful. (Complete Column 1 from top to bottom. Do nothing on Columns 2, 3 or 4 until Column 1 is complete.)</li>
            <li>We asked ourselves why do I have the fear. (Complete Column 2 from top to bottom. Do nothing on Columns 3, or 4 until Column 2 is complete.)</li>
            <li>Which part of self caused the fear? Was it our self-esteem, our security, our ambitions, our sex instinct which had been interfered with? (Complete each column within Column 3 going from top to bottom. Starting with the Self-Esteem Column and finishing with the Sexual Ambitions Column. Do nothing on Column 4 until Column 3 is complete.)</li>
            <li>Referring to our list again. Putting out of our minds the wrongs others had done, we resolutely looked for our own mistakes. Where had we been selfish, dishonest, self-seeking and frightened and inconsiderate? (Asking ourselves the above questions we complete each column within Column 4.)</li>
            <li>Reading from left to right, we now see the fear (Column 1), why do I have the fear (Column 2), the part of self which caused the fear (Column 3), and the exact nature of the defect within us that caused the fear to surface, and block us off from God's will (Column 4).</li>
        </ol>
    </>
);

function Fears() {
    return (
        <StepFourWorksheet
            title="Review of Fears"
            storageKey="fearEntries"
            columnOneLabel="I'm fearful of"
            columnTwoLabel="Why do I have the fear?"
            instructions={fearInstructions}
        />
    );
}

export default Fears;
