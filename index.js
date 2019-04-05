// IMports

require('dotenv').config();


// Node express
const express = require('express');

// Cros
const cors = require('cors');


// Bcrypy

const bcrypt = require('bcryptjs');

// JSon Web Tokens
const jwt = require('jsonwebtoken');

// Database

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());

server.use(cors());


// Token 


function generateToken(user) {
 
 
    const payload = {
    
        subject: user.id,
 
 
    username: user.username,
   

    department: user.department,
  };


  const secret = process.env.JWT_SECRET;
  const options = {
      // Times Out
    expiresIn: '30min',
  };



  return jwt.sign(payload, secret, options);
}


// Post
server.post('/api/login', (req, res) => {
  
  
    const creds = req.body;

// Datab base Users

  db('users')
    
  .where({ username: creds.username })
  
  .first()
  
  .then(user => {
  
    if (user && bcrypt.compareSync(creds.password, user.password)) {
        
        const token = generateToken(user);
  
        res.status(200).json({ message: 'Hello', token });
  
  
    } else {
  
        res.status(401).json({ message: 'Cannot enter' });
      }
  
  
    })
  
    .catch(err => res.json(err));
});


  const token = req.headers.authorization;
  
  
  if (!token) {
  
    res.status(401).json({ message: 'Missing Important Infomation' });
  
} else {


    try {



        req.decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        next();

    } catch(err) {


        res.status(401).json({ message: 'invalid token' })
    }
  }



// Getting Users form Api

server.get('/api/users', protected, (req, res) => {

    db('users')

    .where({ department: req.decodedToken.department})

    .select('id', 'username', 'department')

    .then(users => {


        res.json({users: users, department: req.decodedToken.department});

    })

    .catch(err => res.send(err));

});

// Post Registation Part


server.post('/api/register', (req, res) => {
  
    const creds = req.body;

  
    const hash = bcrypt.hashSync(creds.password, 4);
  
    creds.password = hash;

  db('users')
  
  .insert(creds)
  
  .then(ids => {
  
    res.status(201).json(ids);
  
})

.catch(err => res.json(err));

});

server.get('/', (req, res) => {



    res.send('Work');
});

server.listen(7000, () => ('testing'));