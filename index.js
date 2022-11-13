var express = require("express")
var bodyParser = require("body-parser")
const mongoose = require("mongoose")
const port = process.env.PORT || 3000;

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

// mongoose.connect('mongodb+srv://debjitpurohit:Debjit8125@clusterdebjit.4n2ytuc.mongodb.net/debjitdata?retryWrites=true&w=majority',{
// // mongoose.connect('mongodb://localhost:27017/devsemployee',{
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     //useCreateIndex: true not use in this version
// //   }).then(()=>{
// //     console.log('Connection Successful......');
// //   }).catch((e)=>{
// //     console.log('No Connection');
// //   });
// //   var db = mongoose.connection;
mongoose.connect('mongodb+srv://debjitpurohit:Debjit8125@clusterdebjit.4n2ytuc.mongodb.net/debjitdata?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true not use in this version
  }).then(()=>{
    console.log('Connection Successful......');
  }).catch((e)=>{
    console.log('No Connection');
  });
 var db = mongoose.connection;




app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
});
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})
