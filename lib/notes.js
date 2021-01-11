const fs = require("fs");
const path = require("path");


// function to find the specific note by it's id number
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

// function to find the specific note by it's id number and delete it
function deleteById(id, notesArray) {
    const deleteNote = notesArray.filter(note => note.id === id)[0];
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i] === deleteNote) {
            notesArray.splice(i, 1);
            break;
        }
        
    }

    // notesArray = JSON.parse(notesArray);
    // notesArray.splice(deleteNote, 1);
    console.log(deleteNote);
    // write the new note to the json file
    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
        JSON.stringify(notesArray, null, 2)
    );

}

// function to create new notes
function createNewNote(body, notesArray) {
    const note = body;
    // push new note to the notes array in the json file
    notesArray.push(note);

    // write the new note to the json file
    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
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

module.exports = {
    findById,
    deleteById,
    createNewNote,
    validateNote
};