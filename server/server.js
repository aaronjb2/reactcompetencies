const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const massive = require('massive');
const authctrl = require('./authctrl.js');
const teachctrl = require('./teachctrl.js');
const studentctrl = require('./studentctrl.js');
const classctrl = require('./classctrl.js');


require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));

const {SERVER_PORT, MASSIVE_CONNECTION} = process.env;

app.listen(SERVER_PORT, () =>{
    console.log(`On the ${SERVER_PORT}th day of Christmas my true love gave to me..... nothing because I'm single.`);
})

massive(MASSIVE_CONNECTION).then(db=> {
    app.set('db', db);
    console.log('db is connected');
})

app.post('/student/create',authctrl.createStudent);

app.post('/student/login',authctrl.login);

app.get('/student/get-student',authctrl.getStudent);

app.get('/teacher/get-class-i-teach/:professor_name',teachctrl.getClassITeach)

app.get('/student/get-my-classes/:student_name',studentctrl.getMyClasses)

app.get('/student/get-my-classmates/',studentctrl.getMyClassMates)

app.post('/class/add-class',classctrl.addClass)

app.put('/class/edit-class',classctrl.editClass)

app.delete('/class/delete-class/:class_name/:student_name',classctrl.deleteClass)