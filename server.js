const express = require('express')
const hbs = require('hbs');
const app = express();
const fs = require('fs');

app.set('view engine','hbs');
app.set('view engine','html');
hbs.registerPartials(__dirname+ '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})


app.engine('html',require('hbs').__express)
app.use(express.static(__dirname +'/public'))
app.use((req,res,next)=>{
    var now = new Date().toString()
    var log = `${now} -- ${req.method} -- ${req.url}`;
    fs.appendFile('serve.log',log)
    console.log(`${now} -- ${req.method} -- ${req.url}`)
    next()
})

app.get('/',(req,res)=>{
    // res.send({
    //     name: 'vemkatesh',
    //     age:'23'
    // })
    res.render('home2.html',{
        heading:'home page',
        welcomeMsg : 'Welcome to the home page',
        createdBy:'venkatesh'
    })
})

app.get('/about',(req,res)=>{
   // res.send('sample express application')
   res.render('about.hbs',{
       heading:' about page',
       createdBy:'venkatesh'
   })
})


app.get('/bad',(req,res)=>{
    res.send('unable to get the date')
})

app.listen(3000,()=>{
    console.log('server started')
})