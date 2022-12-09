const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const app = express()
app.use(bodyParser.json());


//post request with url query

app.post('/', (req, res) => {
   let firstName = req.query.firstName;
   let lastName = req.query.lastName;

   res.send(firstName+" "+lastName);
});

//post request with header properties

app.post('/one',(req,res) => {
    let userName= req.header('userName');
    let password= req.header('password');
    res.send("userName:" +userName +" password:" +password)
})

//post request Json

app.post('/two',(req,res) => {
    let JSONData= req.body;
    let JSONString= JSON.stringify(JSONData);
    res.send(JSONString);
})

//file upload

var storage=multer.diskStorage({
    destination:function(req,file,callBack){
        callBack(null,'./uploads');
    },
    filename:function(req,file,callBack){
        callBack(null,file.originalname)
    }
});

var upload=multer({storage:storage}).single('myfile')
app.post('/three',function(req,res){
    upload(req,res,function(error){
        if(error){
            res.send("Upload Failed");

        }
        else{
            res.send("Upload Success");

        }
    })
});

//file download

app.post("/four",function(req,res){
    res.download("./uploads/mocute050.PNG");
})

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))