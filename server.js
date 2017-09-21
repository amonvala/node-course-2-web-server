const express = require('express');
const hbs = require("hbs");
const fs = require('fs'); // file & directory controls

var portNumber = 3000;
var app = express();

// declares location of partials
// partials like includes
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  // append log into server.log file
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('unable to append to server.log');
    }
  });
  next(); // after get request page continues.
          // this next(); does not exist pageTitle
          // continues to look loading for ever
});

/*
app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
});

app.get('/', (req,res) => {
  //res.send('<h1>hello express!</h1>');
  res.render('home.hbs',{
      pageTitle:'Ev',
      welcomeMessage:'hoş geldin.'
    }
  );
});

app.get('/nicolekidman',(req,res)=>{
  res.send('nicole kidman page');
});

app.get('/about',(req,res)=>{

  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/bad',(req,res)=>{
  var errorObject = {
    title:'Opps, sıçtık',
    message:'you need medical care'
  }
  res.send(errorObject);
});
app.listen(portNumber, () => {
    console.log('server is up on port: ' + portNumber);
});

// /bad -send back json with errormesage
