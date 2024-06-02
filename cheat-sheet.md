# Express App Cheat Sheet
---------------------------------------------------------------
BASIC SKELETON
---------------------------------------------------------------
1. Initialize project                    - npm init -y
2. Nodemon
    * Install nodemon                    - npm i -D nodemon
    * Add start script                   - "start": "nodemon index.js"
    * create index.js in root
3. Express
    * Install express                    - npm i express
    * Start initial express server
    * Add static middleware              - create public folder
    * Add static resources to public folder  - css, images and etc.
    * Add body parser                       - urlencoded
    * Add routes module                     - модулярен route в отделен файл
4. Handlebars
    * Install express-handlebars            -  npm i express-handlebars
    * Config handlebars with express        - app.engine('hbs', handlebars.engine({ extname: 'hbs',}));
                                              app.set('view engine', 'hbs');
    * Add views folder with resources 
    * Add home view
    * Add home controller
    * Add home controller to routes
    * Add main layout                   - views/layouts/main.hbs  - default folders and files
    * Add partials dir                   - views/partials
5. Database
    * Install  mongoose                 -  npm i mongoose
    * Setup db connection                - mongoose.connect('mongodb://localhost:27017/course-book');
    * Add user model
--------------------------------------------------------------------------------------
ADVANCED SKELETON
--------------------------------------------------------------------------------------
6. Register
    * Fix navigation links
    * Add register page (view, controller, route)
    * Fix register form
    * Add post register action
    * Add authService
    * Install bcrypt
    * Hash password
    * Check confirm password
    * Check if user exists
7. Login
    * Install jsonwebtoken
    * Install cookie-parser
    * Add cookieParser middleware
    * Optionally: convert to promise based 
    * Add login page
    * Fix login form
    * Add login post action
    * Add authService login method
        * validate user
        * validate password
        * generate token
    * Return cookie
    * Modify register for auto login
8. Logout
9. Authentication & Authorization
    * Add auth middleware
    * Check token if guest
    * Verify token
    * Attach user to request object and res.locals
    * Use middleware in express
    * Add isAuth route guard
10. Error handling
    * Add notifications
    * Add getErrorMessage util
    * Add register error handling
    * Add login error handling
11. Last fixes
    * Dynamic navigation


!! when use update database command must ALWAYS use - {runValidators: true}