const express = require('express');
const  bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const req = require('express/lib/request');
const res = require('express/lib/response');

const app = express();
app.use(bodyParser.json());

 const db = {
        user: [
        {
          id: 123,
          name: 'john',
          email: 'john@gmail.com',
          password: 'arrows',
          imgEntries: 0,
          joined: new Date()
        },
        {
            id: 124,
            name: 'Billy',
            email: 'Billy@gmail.com',
            password: 'cats',
            imgEntries: 0,
            joined: new Date()
          }
        ],
        login:[
            {
                id: '987',
                hash: '',
                email: 'john@gmail.com'
            }
        ]
    }
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send(db.user);
})

app.post('/signin', (req, res) =>{

    if(req.body.email === db.user[0].email && 
        req.body.password === db.user[0].password){
            res.json(db.user[0])
        }else{
            res.status(404).json('error logging In');
        }
})
app.post('/register', (req, res) =>{
    const {id, email, name, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash){
        console.log(hash);
    });

        db.user.push({
            id: id,
            name: name,
            email: email,
            password: password,
            imgEntries: 0,
            joined: new Date()
        })
        res.json(db.user[db.user.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    db.user.forEach(user =>{
        if(user.id === id){
        found = true;
         return  res.json(user);
        }
    })
        if(!found){
            res.status(400).json('not found');
        }
})

app.put('/image', (req, res) =>{
    const {id} = req.body;
    let found = false;
    db.user.forEach(user =>{
    if(user.id === id){
        found = true;
        user.imgEntries++
         return  res.json(user.imgEntries);
    }
    })
    if(!found){
        res.status(400).json('not found');
    }

})


app.listen(3000, () =>{
    console.log('Im listening in port 3000')
})

//sign in router ---> POST json Data: success/fail
//register --> POST = new user
//profile/userID --> GET = user info
// /img --> PUT ==> user