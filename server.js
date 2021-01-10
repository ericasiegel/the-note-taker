const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const express = require('express');

// port variable for heroku and local host
const PORT = process.env.PORT || 3001;

// instantiate the express server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// get the api routes
app.use('/api', apiRoutes);
// get the html routes
app.use('/', htmlRoutes);
// make all public files available to the express server
app.use(express.static('public'));



app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
})