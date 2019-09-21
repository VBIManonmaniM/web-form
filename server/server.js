const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const config = require('config');
const dbConfig = config.get('dbConfig');
const serverConfig = config.get('serverConfig');

const connect = require('./db/connect');
// Connect to mongodb
connect(dbConfig.url);

const User = require('./db/models/user.model');

// Loading necessary middlewares
app.use(cors());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.any());

// to handle the incoming request
app.post('/addUserDetails', async (req, res) => {
    try {
        await User.create({
            ...req.body,
            resume: req.files[0].buffer
        });
        res.sendStatus(201);
    } catch(e) {
        res.send({
            message: 'dberror'
        });
    }
});

app.listen(serverConfig.port, () => {
    console.log(`Listening at ${serverConfig.port}`);
});