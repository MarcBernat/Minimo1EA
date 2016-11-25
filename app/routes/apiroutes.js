var express = require('express');
var mongoose = require('mongoose');
var Student = require('../models/modelstudent');
var Subjects = require('../models/modelsubjects');
var router = express.Router();



// GET Students
router.get('/students', function(req, res) {
  // use mongoose to get all users in the database
  Student.find(function(err, Student) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err)
    res.send(Student);
  });
});
// GET Subjects
router.get('/subjects', function(req, res) {
    // use mongoose to get all users in the database
    Subjects.find({}).populate('students').exec().then(function(err, subjects) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.send(subjects);
    });
});

// GET Subjects by ID
router.get('/subject/:subject_id', function(req, res) {
    // use mongoose to get all users in the database
    Subjects.find({_id: req.params.subject_id}).populate('students').exec().then(function(err, subjects) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.send(subjects);
    });
});


// Post Student
router.post('/student', function(req, res) {
  console.log(req.body);
  Student.create({
    name:req.body.name,
    address:req.body.address
  }, function(err, user) {
    if (err)
      res.send(err);

    // get and return all the Student after you create another
    Student.find(function(err, Student) {
      if (err)
        res.send(err)
      res.send(Student);
    });
  });
});

// Post Subject
router.post('/subject', function(req, res) {
    console.log(req.body);
    Subjects.create({
        name:req.body.name,
        when:req.body.when
    }, function(err, sub) {
        if (err)
            res.send(err);

        // get and return all the Student after you create another
        Subjects.find({}).populate('students').exec().then(function(err, Subjects) {
            if (err)
                res.send(err)
            res.send(Subjects);
        });
    });
});

//Add a contact Work
router.post('/student/add/work', function(req, res) {
    var query = {_id: req.body.student_id};
    var update = {$push : {contacts: {work : req.body.number.toString()}}};
    var options = {};

    Student.findOneAndUpdate(query, update, options, function(err, student) {
        if (err) {
            res.send(err);
        }
        console.log(student);
    });

    Student.find({}, function (err, students) {
        if(err)
            res.send(err)
        res.send(students);
    });
});

//Add a contact Home
router.post('/student/add/home', function(req, res) {

    var query = {_id: req.body.student_id};
    var update = {$push : {contacts: {home : req.body.number.toString()}}};
    var options = {};

    Student.findOneAndUpdate(query, update, options, function(err, student) {
        if (err) {
            res.send(err)
        }
        console.log(student);
    });

    Student.find({}, function (err, students) {
        if(err)
            res.send(err)
        res.send(students);
    });
});

// Update the selected user
router.put('/student/:student_id', function(req, res) {
 Student.update({
   _id : req.params.student_id
 },{$set:{name: req.body.name,
          address: req.body.address}},
     function(err, student) {
      if (err)
        res.send(err);

       Student.find(function(err, student) {
         if(err)
           res.send(err)
         res.send(student);
       });
     });
});


// delete a user
router.delete('/student/:student_id', function(req, res) {
  Student.remove({
    _id : req.params.student_id
  }, function(err, student) {
    if (err)
      res.send(err);
    // get and return all the Student after you delete this one
    Student.find(function(err, Student) {
      if (err)
        res.send(err)
      res.send(Student);
    });
  });
});

// delete a Subject
router.delete('/subject/:subject_id', function(req, res) {
    Subjects.remove({
        _id : req.params.subject_id
    }, function(err, sub) {
        if (err)
            res.send(err);
        // get and return all the Student after you delete this one
        Subjects.find({}).populate('students').exec().then(function(err, sub) {
            if (err)
                res.send(err)
            res.send(sub);
        });
    });
});

//Add a contact Work
router.put('/subject/studentadd/:id', function(req, res) {
    var query = {_id: req.params.id};
    var update = {$addToSet : {"students" : req.body._id}};
    var options = {};

    Subjects.findOneAndUpdate(query, update, options, function(err, subject) {
        if (err) {
            res.send(err);
        }
        console.log(subject);
    });

    Subjects.find({}).populate('students').exec().then(function (err, subject) {
        if(err)
            res.send(err)
        res.send(subject);
    });
});

// GET Subjects
router.get('/subjects/find/:type/:text', function(req, res) {
    switch(req.params.type){
        case 'name':
        {
            Subjects.find({'name': req.params.text}).populate('students').exec().then(function(err, subjects) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err)
                res.send(subjects);
            });
            break;
        }
        case 'period':
        {
            console.log("when" + req.body.text);
            Subjects.find({'when': req.params.text}).populate('students').exec().then(function(err, subjects) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err)
                res.send(subjects);
            });
            break;
        }
        case 'alpha':
        {
            Subjects.find({}).sort({name: 'asc'}).populate('students').exec().then(function(err, subjects) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err)
                res.send(subjects);
            });
            break;
        }
        case 'number':
        {
            Subjects.find({}).populate('students').sort({students: '-students.length'}).exec().then(function(err, subjects) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err)
                res.send(subjects);
            });
            break;
        }
        default:{
            Subjects.find({}).populate('students').exec().then(function(err, subjects) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err)
                res.send(subjects);
            });
            break;
        }
    }
});
module.exports = router;
