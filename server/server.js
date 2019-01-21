const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authctrl = require('./authctrl.js');
const teachctrl = require('./teachctrl.js');

require('dotenv').config();
const app = express();

app.use(bodyParser.json());

const {SERVER_PORT, MASSIVE_CONNECTION} = process.env;

app.listen(SERVER_PORT, () =>{
    console.log(`On the ${SERVER_PORT}th day of Christmas my true love gave to me..... nothing because I'm single.`);
})

massive(MASSIVE_CONNECTION).then(db=> {
    app.set('db', db);
    console.log('db is connected');
})

app.post('/student/create',authctrl.createStudent);

app.get('/teacher/get-class-i-teach/:professor_name',teachctrl.getClassITeach)