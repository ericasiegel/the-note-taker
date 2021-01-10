const fs = require('fs');
const path = require('path');

const notes = require('./data/db.json');

const express = require('express');

// port variable for heroku and local host
const PORT = process.env.PORT || 3001;

// instantiate the express server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// make all public files available to the express server
app.use(express.static('public'));

// function to find the specific note by it's id number
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

// function to find the specific note by it's id number and delete it
function deleteById(id, notesArray) {
    const deleteNote = notesArray.filter(note => note.id === id)[0];
    notesArray.splice(deleteNote, 1);

}

// function to create new notes
function createNewNote(body, notesArray) {
    const note = body;
    // push new note to the notes array in the json file
    notesArray.push(note);

    // write the new note to the json file
    fs.writeFileSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    
    // return finished code to poste route for response
    return note;
}

// function to validate text is entered correctly
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }

    return true;
  }

// get request for the notes array
app.get('/api/notes', (req, res) => {
    res.json(notes);
    // console.log(notes);
});

// get request to get the note by it's id parameter
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else { // returned error if there isn't a requested id number
        res.sendStatus(404);
    }
});

// post request to add notes
app.post('/api/notes', (req, res) => {
    // set the id of the note by generating a random number, base of 36 characters and grab the first 4 characters
    req.body.id = Math.random().toString(36).substr(2, 4);

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The Note is not propery formatted!');
    } else {
        //add the note to the json file
        const note = createNewNote(req.body, notes);

        res.json(note);
    }

});

// delete request to delete note from json array
app.delete('/api/notes/:id', (req, res) => {
    const deleteID = deleteById(req.params.id, notes);
    res.json(deleteID);

})

// html route to get index.html to the server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// html route to get notes.html to the server
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
})