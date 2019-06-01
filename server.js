/*
/ --> res = this is working
/signin --> POST res = success/failed
/register --> POST res = user
/profile/:userId --> GET res = user
/image --> PUT res = user 
hashing: encrypting the passwords
 */

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'lata',
      password : 'clpl@764',
      database : 'face_recognition_app_db'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

/************** Simple Get Request Api************/
app.get('/',(req ,res)=>{
  res.send("Its Working!!!");
});
// app.get('/',(req ,res)=>{
// //   can also be written as 
// //   db.('users').orderBy('id')
//   db.select('*').from('users').orderBy('id')
//   .then(data => {
//     res.json(data);
//   })
//   .catch(err => res.status(400).json('No data found'));
// });
/************** Simple Get Request Api************/

/**************SignIn Api**************** */
app.post('/signin',(req ,res) => { 
  signin.handleSignin(req, res, db, bcrypt)
});
// https://morning-escarpment-45264.herokuapp.com/

/**************SignIn Api**************** */

/**************Register Api**************** */
app.post('/register',(req ,res) => { register.handleRegister(req, res, db, bcrypt)});
/**************Register Api**************** */

/************** /profile/:id Api**************** */
app.get('/profile/:id',(req ,res) => { profile.handleProfileGet(req, res, db)});
/************** /profile/:id Api**************** */

/************** Image Api**************** */
app.put('/image',(req ,res) => { image.handleImage(req, res, db) });
/************** Image Api**************** */

/************** Imageurl Api**************** */
app.post('/imageurl',(req ,res) => { image.handleApiCall(req, res) });
/************** Imageurl Api**************** */

const port = process.env.PORT;
app.listen(port || 3000, ()=>{
  if(port){
    console.log(`app is running on port = ${process.env.PORT}`);
  } else{
    console.log('app is running on port 3000');
  } 
});
console.log('Hello!!!');