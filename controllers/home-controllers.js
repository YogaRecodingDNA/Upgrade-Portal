const Course = require('../models/Course');
const User = require('../models/User');




exports.homeGuest = (req, res) => {

    Course.find((err, courses) => {
        if (err) return console.error(err);

        courses = courses.map( course => course.toJSON());

        courses.forEach( course => {

            console.log(course.title, ' ===> ', course.enrolledUsers.length);
        });

        const topCourses = courses.sort( (a, b) => b.enrolledUsers.length - a.enrolledUsers.length).slice(0, 3);

        res.render('home-guest', {topCourses, courses});
    });
};





exports.homeUser = (req, res) => {

    const user = req.user;

    Course.find((err, courses) => {
        if (err) return console.error(err);

        courses = courses.map( course => course.toJSON()).reverse();

        courses.forEach( course => {

            console.log(course.title, ' ===> ', course.enrolledUsers.length);
        });
        
        res.render('home-user', {courses, user});
        
    });

};
