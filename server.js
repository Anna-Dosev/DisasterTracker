const express = require('express')
const server = express()

const navs = ['Home', 'Prep', 'Donate']

server.use(express.json()); //middlewear executes before the server sends the response 
server.use('/public', express.static(__dirname + "/public")); //if you see css, this is where i want you to look 
server.use('/js', express.static(__dirname + "/js"));
server.set('view engine', 'ejs'); //view engine is an accepted value


server.get('/', (req, res) => {
    res.render('pages', {template: 'landing'});
});

server.get('/prep', (req, res) => {
    res.render('pages', {template: 'prep'});
});

server.get('/help', (req, res) => {
    res.render('pages', {template: 'help'});
});

server.listen(8080, () => {
    console.log('The server is running at PORT 8080.')
});