const express= require('express');
const path= require('path');
const bodyParser= require('body-parser');
const knex= require('knex');

const db= knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Piku',
        database: 'flynest'
    }
})


const app= express();
let intialPath = path.join(__dirname,"public");
app.use(bodyParser.json());
app.use(express.static(intialPath));

app.get('/',(req,res)=>{
    res.sendFile(path.join(intialPath,"index.html"));
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(intialPath,"login.html"));
})
app.get('/signup',(req,res)=>{
    res.sendFile(path.join(intialPath,"signup.html"));
})
app.post('/register-user',(req,res)=>{
    const {fname,lname,phonenumber,email,password}=req.body;
    if(!fname.length || !lname.length || !phonenumber.length || !email.length || !password.length){
        res.json('fill all the fields');
    }
    else{
        db('users')
      .insert({
        name: fname,
        lname: lname,
        phonenumber: phonenumber,
        username: email,
        password: password
        
      })
      .then(() => {
        return db.select('name', 'username')
                .from("users")
                .where({ username: email })
      })
      .then(data => { 
        res.json(data[0]);
      })
      .catch(err => {
        if (err.code === 'ER_DUP_ENTRY') {
          res.json('email already exists');
        } else {
          // handle other errors
        //   res.json('email already exists');
        }
      })
  }
})

app.post('/login-user',(req,res)=>{
    const {email,password}= req.body;

    db.select('name','username')
    .from('users')
    .where({
        username: email,
        password: password
    })
    .then(data=>{
        if(data.length){
            res.json(data[0]);
        }else{
            res.json('email or password is invalid!!');
        }
    })
})

app.listen(3000,(req,res)=>{
    console.log("listening on port 3000")
})