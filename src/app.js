const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('express').Router();
const taskManager = require('./routes/tasksManager');

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 5001;

routes.use('/tasks', taskManager);

routes.get('/', (req, res) => {
    res.status(200).send('Welcome to task manager server. Use swagger for interacting with API');
});


app.listen(PORT, (error) => {
    if(!error) {
        console.log('Server is succesfully running and listening on port ' + PORT);
    }
    else {
        console.log('Error occurred, with ', error);
    }
});