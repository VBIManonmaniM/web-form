const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const config = require('config');
const serverConfig = config.get('serverConfig');

app.use(cors());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.any());


app.post('/addUserDetails', (req, res) => {
});

app.listen(serverConfig.port, () => {
    console.log(`Listening at ${serverConfig.port}`);
});