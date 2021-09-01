const Course = require('../models/Course');
const User = require('../models/User');
const moment = require('moment');
const { validationResult } = require('express-validator');



exports.createCourse = (req, res) => {

    const user = req.user;

    const notification = req.cookies.invalid;

    res.render('create-course', { 
        user,
        notification
     });

    if (notification){ res.clearCookie('invalid'); }
};




exports.createCoursePOST = (req, res) => {

    if (req.cookies.invalid){ res.clearCookie('invalid'); }
  
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
  
      console.log(errors);
  
      const errorMsg = errors.array()[0].msg;
  
      res.cookie("invalid", errorMsg, { maxAge: 3000 });
  
      res.redirect('/createCourse');
      
    } else {

        const body = req.body;
        const user = req.user;
        body.courseCreator = user.userId;
        const isPublic = body.isPublic ? true : false;
        body.isPublic = isPublic;
        body.dateAdded = moment().format("ddd MMM Do YYYY h:mm:ss a");

        const newCourse = new Course(body);

        newCourse.save( (err, newCourse) => {
            if (err) return console.error(err);

            console.log(newCourse);

            res.redirect('/user');
        });
    } 
};




exports.courseDetails = (req, res) => {

    const user = req.user;

    Course.findById(req.params.id, (err, course) => {

        const creator = user.userId == course.courseCreator ? true : false;

        course = course.toJSON();
  
        User.findById(user.userId, (err, user) => {
            
            const enrolled = user.enrolledCourses.includes(course._id) ? true : false;
            
            user = user.toJSON();

            res.render('course-details', { creator, course, enrolled, user });

        });
    });
};




exports.editCourse = (req, res) => {

    const user = req.user;

    const notification = req.cookies.invalid;

    Course.findById(req.params.id, function(err, course){

        course = course.toJSON();

        res.render('edit-course', {
            user,
            course,
            notification
        });
    });

    if (notification){ res.clearCookie('invalid'); }
};




exports.editCoursePOST = (req, res) => {

    const courseId = req.params.id;

    const body = req.body;

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
  
      console.log(errors);
  
      const errorMsg = errors.array()[0].msg;
  
      res.cookie("invalid", errorMsg, { maxAge: 3000 });
  
      res.redirect(`/editCourse/${courseId}`);
      
    } else {

        const isPublic = body.isPublic ? true : false;
        body.isPublic = isPublic;
  
        Course.findByIdAndUpdate({_id: courseId}, req.body, (err, editedCourse) => {
            if (err) console.error(err);

            console.log("ID ======> ", req.params.id);
            console.log("BODY ======> ", req.body);
            console.log("COURSE ======> ", editedCourse);

            // editedCourse = editedCourse.toJSON();
      
            editedCourse.save((err, result) => {
                if (err) return console.error(err);
                res.redirect('/user');
            });
        });   
    }
};




exports.deleteCourse = (req, res) => {

    Course.findByIdAndDelete(req.params.id, (err, course) => {
        if (err) return console.error(err);

        res.redirect('/user');

    });

};




exports.courseEnrollment = (req, res) => {

    const courseId = req.params.id;

    const userId = req.user.userId;

    User.findById(userId, (err, user) => {

        if (err) return console.error(err);

        user.enrolledCourses.push(courseId);

        user.save( (err) => {
            if (err) return console.error(err);
        });
    }).then(response => {

        Course.findById(courseId, (err, course) => {
            
            if (err) console.error(err);
            
            course.enrolledUsers.push(userId);
            
            course.save( (err) => {
                
                if (err) console.error(err);
                
                res.redirect(`/user`);
            });
        });
    });
    
};