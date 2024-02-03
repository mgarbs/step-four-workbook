import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './StepFourWorksheet.css';

const initialEntry = {
    columnOne: '',
    columnTwo: '',
    selfEsteem: false,
    personalRelationships: false,
    material: false,
    emotional: false,
    social: false,
    security: false,
    sexual: false,
    acceptableSexRelations: false,
    hiddenSexRelations: false,
    selfish: false,
    dishonest: false,
    inconsiderate: false,
    frightened: false,
    myPart: '',
};
//Self-Esteem	Personal Relationships	Material	Emotional	Acceptable Sex Relations	Hidden Sex Relations	Social	Security	Sexual	Selfish	Dishonest	Self-seeking & frightened	Inconsiderate

const API_BASE_URL = 'http://localhost:3001/api';

function StepFourWorksheet({ title, columnOneLabel, columnTwoLabel, storageKey }) {

    const [headerHeights, setHeaderHeights] = useState({
        topLevel: 75,   // Set your default heights that worked for you here
        midLevel: 147.5,
        lowestLevel: 257,
    });

    const headerRefs = {
        topLevel: useRef(null),
        midLevel: useRef(null),
        lowestLevel: useRef(null),
    };

    // This function will be defined within your component
    const updateHeaderHeights = () => {
        const topLevelHeight = headerRefs.topLevel.current?.offsetHeight || 0;
        const midLevelHeight = headerRefs.midLevel.current?.offsetHeight || 0;

        // Adjust 'top' for mid-level header, it should be just below the top-level header
        if (headerRefs.midLevel.current) {
            headerRefs.midLevel.current.style.top = `${topLevelHeight}px`;
        }

        // For lowest-level header, it's cumulative: the height of top-level plus mid-level headers
        if (headerRefs.lowestLevel.current) {
            headerRefs.lowestLevel.current.style.top = `${topLevelHeight + midLevelHeight}px`;
        }
    };

    // Effect for setting up and cleaning up the event listener for window resize
    useEffect(() => {
        window.addEventListener('resize', updateHeaderHeights);
        // Call it initially to set up the correct heights
        updateHeaderHeights();

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', updateHeaderHeights);
        };
    }, []); 


    const [entries, setEntries] = useState(
        () => JSON.parse(localStorage.getItem(storageKey)) || [initialEntry]
    );

    const adjustAllTextAreaHeights = () => {
        document.querySelectorAll('.textarea-autosize').forEach((textarea) => {
            textarea.style.height = 'inherit';
            textarea.style.height = `${textarea.scrollHeight}px`;
        });
    };


    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(entries));
    }, [entries, storageKey]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/entries?category=${storageKey}`);
                setEntries(data.length > 0 ? data : [{ ...initialEntry, category: storageKey }]);
                if (data.length > 0) {
                    setEntries(data);
                    adjustAllTextAreaHeights();
                } else {
                    setEntries([{ ...initialEntry, category: storageKey }]);
                }
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchEntries();

    }, [storageKey]);

    function debounce(func, wait) {
        let timeout;

        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const debouncedUpdateEntry = useRef(debounce(async (id, updatedEntry) => {
        try {
            await axios.patch(`${API_BASE_URL}/entries/${id}`, updatedEntry);
        } catch (error) {
            console.error('Error updating entry:', error);
        }
    }, 500)).current; // 500ms delay




    const handleEntryChange = (index, field, value) => {
        let newEntries = [...entries];
        let entry = { ...newEntries[index], [field]: value };

        // Check if the entry is new and needs to be saved
        if (!entry._id) {
            // Only save if there's some content
            if (value.trim() !== '') {
                // Save the new entry immediately
                saveNewEntry(index, entry);
            }
        } else {
            // Existing entry, update it
            newEntries[index] = entry;
            setEntries(newEntries);
            debouncedUpdateEntry(entry._id, { [field]: value });
        }
    };

    const saveNewEntry = async (index, entry) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/entries`, {
                ...entry,
                category: storageKey
            });
            let newEntries = [...entries];
            newEntries[index] = response.data;
            setEntries(newEntries);
        } catch (error) {
            console.error('Error saving new entry:', error);
        }
    };


    const handleTextAreaInput = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleCheckboxChange = (index, field) => {
        let newEntries = [...entries];
        let entry = { ...newEntries[index], [field]: !newEntries[index][field] };
        newEntries[index] = entry;
        setEntries(newEntries);

        if (entry._id) {
            debouncedUpdateEntry(entry._id, { [field]: entry[field] });
        }
    };




    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();  // Prevent the default action to avoid submitting the form
            addNewRow();
        }
    };

    const addNewRow = async () => {
        const newEntryWithCategory = { ...initialEntry, category: storageKey };
        try {
            const response = await axios.post(`${API_BASE_URL}/entries`, newEntryWithCategory);
            const updatedEntries = [...entries, response.data];
            setEntries(updatedEntries);
            setTimeout(() => {
                lastRowRef.current?.focus();
            }, 0);
            adjustAllTextAreaHeights();
        } catch (error) {
            console.error('Error adding new entry:', error);
        }
    };

    const deleteRow = async (index) => {
        try {
            const entry = entries[index];
            await axios.delete(`${API_BASE_URL}/entries/${entry._id}`);
            const newEntries = [...entries];
            newEntries.splice(index, 1);
            setEntries(newEntries);
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const lastRowRef = useRef(null);


    return (
        <div className="worksheet">
            <h1>{title}</h1>
            <div className="instructions">
                {/* Add all instructions here as text */}
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{
                    '--topLevelHeaderHeight': `${headerHeights.topLevel}px`,
                    '--midLevelHeaderHeight': `${headerHeights.midLevel}px`,
                    '--lowestLevelHeaderHeight': `${headerHeights.lowestLevel}px`,
                }}>
                    <table className="entry-table">
                        <thead>
                            <tr ref={headerRefs.topLevel}>
                                <th rowSpan="3" className="top-level-header">Column 1</th>
                                <th rowSpan="3" className="top-level-header">Column 2</th>
                                <th colSpan="9" rowSpan="1" className="top-level-header">Affects my</th>
                                <th rowSpan="2" colSpan="4" className="top-level-header">What is the Exact Nature of My Wrongs, faults, mistakes, defects, shortcomings</th>
                                <th rowSpan="3" colSpan="1" className="top-level-header">What was MY PART in all this? What did I do initially to get the ball rolling? How could I have done things differently?</th>
                            </tr>
                            <tr ref={headerRefs.midLevel}>
                                <th colSpan="2" className="mid-level-header">Social Instinct</th>
                                <th colSpan="2" className="mid-level-header">Security Instinct</th>
                                <th colSpan="2" className="mid-level-header">Sex Instinct</th>
                                <th colSpan="3" className="mid-level-header">Ambitions</th>
                            </tr>
                            <tr ref={headerRefs.lowestLevel}>
                                <th className='lowest-level-header'>Self-Esteem</th>
                                <th className='lowest-level-header'>Personal Relationships</th>
                                <th className='lowest-level-header'>Material</th>
                                <th className='lowest-level-header'>Emotional</th>
                                <th className='lowest-level-header'>Acceptable Sex Relations</th>
                                <th className='lowest-level-header'>Hidden Sex Relations</th>
                                <th className='lowest-level-header'>Social</th>
                                <th className='lowest-level-header'>Security</th>
                                <th className='lowest-level-header'>Sexual</th>
                                <th className='lowest-level-header'>Selfish</th>
                                <th className='lowest-level-header'>Dishonest</th>
                                <th className='lowest-level-header'>Self-seeking & frightened</th>
                                <th className='lowest-level-header'>Inconsiderate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            className="column-one-input"
                                            type="text"
                                            placeholder={columnOneLabel}
                                            value={entry.columnOne}
                                            ref={index === entries.length - 1 ? lastRowRef : null}
                                            onChange={(e) => handleEntryChange(index, 'columnOne', e.target.value)}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </td>
                                    <td>
                                        <textarea
                                            className="textarea-autosize"
                                            value={entry.columnTwo}
                                            onInput={handleTextAreaInput}
                                            onChange={(e) => handleEntryChange(index, 'columnTwo', e.target.value)}
                                            placeholder={columnTwoLabel}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </td>
                                    {/* Render checkboxes for each "Affects my" field */}
                                    <td className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={entry.selfEsteem}
                                            onChange={() => handleCheckboxChange(index, 'selfEsteem')}
                                        />
                                    </td>
                                    <td className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={entry.personalRelationships}
                                            onChange={() => handleCheckboxChange(index, 'personalRelationships')}
                                        />
                                    </td>
                                    <td className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={entry.material}
                                            onChange={() => handleCheckboxChange(index, 'material')}
                                        />
                                    </td>
                                    <td className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={entry.emotional}
                                            onChange={() => handleCheckboxChange(index, 'emotional')}
                                        />
                                    </td>
                                    <td className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={entry.acceptableSexRelations}
                                            onChange={() => handleCheckboxChange(index, 'acceptableSexRelations')}
                                        />
                                    </td>
                                    <td className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={entry.hiddenSexRelations}
                                            onChange={() => handleCheckboxChange(index, 'hiddenSexRelations')}
                                        />
                                    </td>
                                    <td className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={entry.social}
                                            onChange={() => handleCheckboxChange(index, 'social')}
                                        />
                                    </td>
                                    <td className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={entry.security}
                                            onChange={() => handleCheckboxChange(index, 'security')}
                                        />
                                    </td>
                                    <td className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={entry.sexual}
                                            onChange={() => handleCheckboxChange(index, 'sexual')}
                                        />
                                    </td>
                                    {/* ... */}
                                    {/* Render checkboxes for each "Nature of My Wrongs" field */}
                                    <td className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={entry.selfish}
                                            onChange={() => handleCheckboxChange(index, 'selfish')}
                                        />
                                    </td>
                                    <td className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={entry.dishonest}
                                            onChange={() => handleCheckboxChange(index, 'dishonest')}
                                        />
                                    </td>
                                    <td className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={entry.frightened}
                                            onChange={() => handleCheckboxChange(index, 'frightened')}
                                        />
                                    </td>
                                    <td className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={entry.inconsiderate}
                                            onChange={() => handleCheckboxChange(index, 'inconsiderate')}
                                        />
                                    </td>
                                    {/*5th column */}
                                    <td>
                                        <textarea
                                            className="textarea-autosize"
                                            value={entry.myPart}
                                            onInput={handleTextAreaInput}
                                            onChange={(e) => handleEntryChange(index, 'myPart', e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="My part in this"
                                        />
                                    </td>
                                    <td>
                                        <button type="button" className="delete-row-button" onClick={() => deleteRow(index)}>x</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button type="button" className="add-new-row-button " onClick={addNewRow}>Add New Row</button>
            </form>
        </div >
    );
}

export default StepFourWorksheet;
