module.exports = (app) => {

    app.get('/', function(req,res) {
        res.render('home-guest');
    });
    
    app.get('/user', function(req,res) {
        res.render('home-user');
    });

    app.get('/createCourse', function(req,res) {
        res.render('create-course');
    });

    app.get('/courseDetails', function(req,res) {
        res.render('course-details');
    });

    app.get('/editCourse', function(req,res) {
        res.render('edit-course');
    });

    app.get('/login', function(req,res) {
        res.render('login');
    });

    app.get('/register', function(req,res) {
        res.render('register');
    });

};