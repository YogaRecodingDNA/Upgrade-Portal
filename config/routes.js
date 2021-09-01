const HomeCtrl = require('../controllers/home-controllers');
const CourseCtrl = require('../controllers/course-controllers');
const RegisterLoginLogoutCtrl = require('../controllers/register-login-logout-controllers');
const authorization = require('../middleware/authorization');
const validation = require('../middleware/validation');

module.exports = (app) => {

    app.get('/', HomeCtrl.homeGuest);
    
    app.get('/user', authorization, HomeCtrl.homeUser);

    app.get('/createCourse', authorization, CourseCtrl.createCourse);

    app.post('/createCourse', validation.create, authorization, CourseCtrl.createCoursePOST);

    app.get('/courseDetails/:id', authorization, CourseCtrl.courseDetails);

    app.get('/courseEnrollment/:id', authorization, CourseCtrl.courseEnrollment);

    app.get('/editCourse/:id', authorization, CourseCtrl.editCourse);
    
    app.post('/editCourse/:id', validation.edit, authorization, CourseCtrl.editCoursePOST);
    
    app.get('/deleteCourse/:id', authorization, CourseCtrl.deleteCourse);

    app.get('/login', RegisterLoginLogoutCtrl.login);
    
    app.post('/login', validation.login, RegisterLoginLogoutCtrl.loginPOST);
    
    app.get('/logout', RegisterLoginLogoutCtrl.logout);
    
    app.get('/register', RegisterLoginLogoutCtrl.register);

    app.post('/register', validation.register, RegisterLoginLogoutCtrl.registerPOST);

};