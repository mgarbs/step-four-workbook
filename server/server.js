const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const cors = require('cors');
app.use(cors());

app.use(express.json()); // For parsing application/json
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a Mongoose schema and model
const EntrySchema = new mongoose.Schema({
    columnOne: String,
    columnTwo: String,
    selfEsteem: Boolean,
    personalRelationships: Boolean,
    material: Boolean,
    emotional: Boolean,
    acceptableSexRelations: Boolean,
    hiddenSexRelations: Boolean,
    social: Boolean,
    security: Boolean,
    sexual: Boolean,
    selfish: Boolean,
    dishonest: Boolean,
    frightened: Boolean, // Assuming you want to capture this as one field
    inconsiderate: Boolean,
    myPart: String,
    category: { type: String, required: true },
}, { timestamps: true });

const Entry = mongoose.model('Entry', EntrySchema);

// GET all entries
app.get('/api/entries', async (req, res) => {
    const { category } = req.query; // Use query param to filter by category
    let query = category ? { category } : {};
    try {
        const entries = await Entry.find(query);
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a single entry by ID
app.get('/api/entries/:id', async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id);
        if (!entry) return res.status(404).json({ message: 'Entry not found' });
        res.json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new entry
app.post('/api/entries', async (req, res) => {
    const entry = new Entry(req.body); // Make sure req.body includes 'category'
    try {
        const newEntry = await entry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE an entry by ID
app.patch('/api/entries/:id', async (req, res) => {
    try {
        const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!entry) return res.status(404).json({ message: 'Entry not found' });
        res.json(entry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE an entry by ID
app.delete('/api/entries/:id', async (req, res) => {
    try {
        const entry = await Entry.findByIdAndDelete(req.params.id);
        if (!entry) return res.status(404).json({ message: 'Entry not found' });
        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
