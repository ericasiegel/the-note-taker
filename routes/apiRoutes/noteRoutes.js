const router = require('express').Router();
const { findById, deleteById, createNewNote, validateNote } = require('../../lib/notes');
const notes = require('../../data/db.json');


// get request for the notes array
router.get('/notes', (req, res) => {
    res.json(notes);
    // console.log(notes);
});

// get request to get the note by it's id parameter
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else { // returned error if there isn't a requested id number
        res.sendStatus(404);
    }
});

// post request to add notes
router.post('/notes', (req, res) => {
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
router.delete('/notes/:id', (req, res) => {
    const deleteID = deleteById(req.params.id, notes);
    res.json(deleteID);
    
});

module.exports = router;