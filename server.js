//require data from db.json
const notes = require('./data/db.json');

const express = require('express');

// instantiate the express server
const app = express();

app.get('/api/notes', (req, res) => {
    res.json(notes);
    // console.log(notes);
});


app.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(req.query)
    res.json(results);
})

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
})