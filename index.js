const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');  



const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on('error', () => console.error('Error in Connecting to Database'))
db.once('open', () => console.log('Connected to Database'))

app.post('/apply', (req, res)=> {
    let fullname = req.body.fullname;
    let username = req.body.username;
    let email = req.body.email;
    let phonenumber = req.body.phonenumber;
    let password = req.body.password;
    let confirmpassword = req.body.confirmpassword;

    let data ={
        'fullname': fullname,
        'username': username,
        'email': email,
        'phonenumber': phonenumber,
        'password': password,
        'confirmpassword': confirmpassword
    }

    db.collection('users').insertOne(data,(err, collection) =>{
        if(err){
            throw err;
        }
        console.log('Record inserted Successfully')
    });

    return res.redirect('apply.html')
})

app.get('/', (req, res)=> {
    res.send({
        "Allow-access-Allow-Origin" : "*"
    });
    return res.redirect('index.html')
}).listen(4000);

console.log(`server listening on port 4000`)