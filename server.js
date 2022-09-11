const cookieParser = require('cookie-parser');
const express = require('express')
const session = require('express-session')
const checkAuth = require('./middlewear')
const { User } = require('./models')
const server = express()

const navs = ['Home', 'Disaster Log', 'Donate']

//third party middlewear
server.use(cookieParser())
server.use(express.json()); //middlewear executes before the server sends the response
server.use('/public', express.static(__dirname + "/public")); //if you see css, this is where i want you to look 
server.use('/js', express.static(__dirname + "/js"));
server.set('view engine', 'ejs'); //view engine is an accepted value
server.use(
    session({
      cookie: {
        secure: false,  // allow requests over http; if true, allow only over https
        maxAge: 86400  // set cookie expiration for 86,400 seconds (i.e. 24 hours)
      },
      resave: false,  // update the session even when there are no changes
      saveUninitialized: true,  // always create a session
      secret: 'H!4e_#uTr2'  // a unique value that signs the cookie
    })
  );

//the cookie now knows who the user is bc we added it to the session
//psql posttgres, \l, \c user-account-dev, select * from "Users";

server.get('/login', (req, res) => {
    res.json({
      message: 'Please login'
    });
  });
  
  server.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        email: username,
        password: password
      }
    });
    if (user) {
      req.session.user = user;
      res.redirect(`/users/${user.id}`);
    } else {
      const createUser = 
      await User.create({
        firstName: username,
        lastName: '',
        email: '',
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(createUser)
       if (createUser) {
        req.session.user = createUser;
        res.redirect(`/users/${createUser.id}`);
      } else {
        res.json({
          message: 'There is a problem with the username or password.'
        });
      }
    }
  });
  
  server.get('/users/:id', checkAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        res.json({
          message: `User with id ${id} has been successfully authenticated.`
        });
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: 'User not found' });
    }
  });


server.get('/', (req, res) => {
    res.render('pages', {template: 'home'});
});

server.get('/disasterLog', (req, res) => {
    res.render('pages', {template: 'disasterLog'});
});

server.get('/help', (req, res) => {
    res.render('pages', {template: 'help'});
});

server.listen(8080, () => {
    console.log('The server is running at PORT 8080.')
});