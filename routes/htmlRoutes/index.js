const path = require('path');
const router = require('express').Router();


// html route to get index.html to the server
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// html route to get notes.html to the server
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});


module.exports = router;