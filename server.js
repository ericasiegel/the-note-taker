//require data from db.json
const notes = require('./data/db.json');

const express = require('express');

const PORT = process.env.PORT || 3001;

// instantiate the express server
const app = express();

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

app.get('/api/notes', (req, res) => {
    res.json(notes);
    // console.log(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
})