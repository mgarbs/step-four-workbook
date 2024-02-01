import React, { useState } from 'react';
import './StepFourWorksheet.css';

const initialEntry = {
    columnOne: '',
    columnTwo: '',
    selfEsteem: false,
    security: false,
    sexRelations: false,
    ambitions: false,
    selfish: false,
    dishonest: false,
    inconsiderate: false,
    frightened: false,
    myPart: '',
};

function StepFourWorksheet({ title }) {
    const [entries, setEntries] = useState([initialEntry]);


    const handleEntryChange = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index] = { ...newEntries[index], [field]: value };
        setEntries(newEntries);
    };

    const handleCheckboxChange = (index, field) => {
        const newEntries = [...entries];
        newEntries[index] = { ...newEntries[index], [field]: !newEntries[index][field] };
        setEntries(newEntries);
    };

    const addNewRow = () => {
        setEntries([...entries, { ...initialEntry }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement the submission logic here, such as saving to a database or sending to a server
        console.log(title, entries);
    };

    return (
        <div className="worksheet">
            <h2>{title}</h2>
            <div className="instructions">
                {/* Add all instructions here as text */}
            </div>
            <form onSubmit={handleSubmit}>
                <table className="entry-table">
                    <thead>
                        <tr>
                            <th rowspan="3" className="top-level-header">Column 1</th>
                            <th rowspan="3" className="top-level-header">Column 2</th>
                            <th colspan="9" className="top-level-header">Affects my</th>
                            <th rowspan="2" colspan="4" className="top-level-header">What is the Exact Nature of My Wrongs, faults, mistakes, defects, shortcomings</th>
                            <th rowspan="3" className="top-level-header">What was MY PART in all this? What did I do initially to get the ball rolling? How could I have done things differently?</th>
                        </tr>
                        <tr>
                            <th colspan="2" className="mid-level-header">Social Instinct</th>
                            <th colspan="2" className="mid-level-header">Security Instinct</th>
                            <th colspan="2" className="mid-level-header">Sex Instinct</th>
                            <th colspan="3" className="mid-level-header">Ambitions</th>
                        </tr>
                        <tr>
                            <th>Self-Esteem</th>
                            <th>Personal Relationships</th>
                            <th>Material</th>
                            <th>Emotional</th>
                            <th>Acceptable Sex Relations</th>
                            <th>Hidden Sex Relations</th>
                            <th>Social</th>
                            <th>Security</th>
                            <th>Sexual</th>
                            <th>Selfish</th>
                            <th>Dishonest</th>
                            <th>Self-seeking & frightened</th>
                            <th>Inconsiderate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="I'm resentful at"
                                        value={entry.columnOne}
                                        onChange={(e) => handleEntryChange(index, 'columnOne', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="The cause"
                                        value={entry.columnTwo}
                                        onChange={(e) => handleEntryChange(index, 'columnTwo', e.target.value)}
                                    />
                                </td>
                                {/* Render checkboxes for each "Affects my" field */}
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={entry.selfEsteem}
                                        onChange={() => handleCheckboxChange(index, 'selfEsteem')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={entry.personalRelationships}
                                        onChange={() => handleCheckboxChange(index, 'personalRelationships')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={entry.material}
                                        onChange={() => handleCheckboxChange(index, 'material')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={entry.emotional}
                                        onChange={() => handleCheckboxChange(index, 'emotional')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={entry.acceptableSexRelations}
                                        onChange={() => handleCheckboxChange(index, 'acceptableSexRelations')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={entry.hiddenSexRelations}
                                        onChange={() => handleCheckboxChange(index, 'hiddenSexRelations')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={entry.social}
                                        onChange={() => handleCheckboxChange(index, 'social')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={entry.security}
                                        onChange={() => handleCheckboxChange(index, 'security')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={entry.sexual}
                                        onChange={() => handleCheckboxChange(index, 'sexual')}
                                    />
                                </td>
                                {/* ... */}
                                {/* Render checkboxes for each "Nature of My Wrongs" field */}
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={entry.selfish}
                                        onChange={() => handleCheckboxChange(index, 'selfish')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={entry.dishonest}
                                        onChange={() => handleCheckboxChange(index, 'dishonest')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={entry.frightened}
                                        onChange={() => handleCheckboxChange(index, 'frightened')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={entry.inconsiderate}
                                        onChange={() => handleCheckboxChange(index, 'inconsiderate')}
                                    />
                                </td>
                                {/*5th column */}
                                <td>
                                    <input
                                        type="text"
                                        placeholder="My part in this"
                                        value={entry.myPart}
                                        onChange={(e) => handleEntryChange(index, 'myPart', e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="button" onClick={addNewRow}>Add New Row</button>
                <button type="submit">Save {title}</button>
            </form>
        </div >
    );
}

export default StepFourWorksheet;
