// modules =================================================
const express = require('express');
var mongoose = require('mongoose');
const app = express();
// set our port
const port = 3000;
app.get('/', (req, res) => res.send('Welcome to Tutorialspoint!'));

// congig files
var db = require('./config/db');
console.log("connecting--", db);
mongoose.connect(db.url);

//defining route
app.get('/route', function (req, res) {
    res.send('This is routing for the application developed using Node and Express...');
   });

// sample api route
// grab the students model we just created
var Student = require('./app/models/students');
app.get('/api/students', function(req, res){
    Student.find(function(err, students){
        if(err)
            res.send(err);
        res.json(students);
    });
});
// startup our app at http://localhost:3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post('/api/students/add', function (req, res) {
    var student = new Student(); // create a new instance of the student model
    student.name = req.body.name; // set the student name (comes from the request)
    student.save(function(err) {
    if (err)
    res.send(err);
    res.json({ message: 'student created!' });
    });
   });
   
   var cookieParser = require('cookie-parser');
   var bodyParser = require('body-parser');
   // set up BodyParser Middleware
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(cookieParser());
   