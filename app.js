/*
const express = require('express');
const bodyParser = require('body-parser');
const request = require ('request');
const https = require ('https');

const app = express();
app.use(express.static('main'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html')
})

app.post('/',function(req,res){
    const fname= req.body.fName
    const sname= req.body.sName
    const emailadress=req.body.email
    
    const data= {
        members:[
            {
                email_address:'emailadress',
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:sname
                }
            }
        ]
    }

    const Jsondata= JSON.stringify(data);
    const url= 'https://us8.api.mailchimp.com/3.0/lists/ae32f6a73b';
    const option = {
        method:'POST',
        auth:'Abrorkhan:f49b699b329a8b365898bf7e4ee3aeba-us8'
    }
    const request= https.request(url, option, function(response){
        response.on('data',function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(Jsondata);
    request.end();
});



app.listen(5355,function(){
    console.log("server is running on port 5355 😁");
});

*/

//API key
// f49b699b329a8b365898bf7e4ee3aeba-us8

//Audience ID  
// ae32f6a73b      



const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static('main'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) {
  const fname = req.body.fName;
  const sname = req.body.sName;
  const emailaddress = req.body.email;

  const data = {
    members: [
      {
        email_address: emailaddress,
        status: 'subscribed',
        merge_fields: {
          FNAME: fname,
          LNAME: sname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = 'https://us8.api.mailchimp.com/3.0/lists/ae32f6a73b';
  const options = {
    method: 'POST',
    auth: 'Abrorkhan:f49b699b329a8b365898bf7e4ee3aeba-us8',
  };
  const mailchimpRequest = https.request(url, options, function (response) {
    if(response.statusCode===200){
      res.sendFile(__dirname+'/success.html');
    } else{
      res.sendFile(__dirname+ '/failure.html');
    }
    
    response.on('data', function (data) {
      console.log(JSON.parse(data));
    });
  });

  mailchimpRequest.write(jsonData);
  mailchimpRequest.end();
});

app.post('/failure',function (req,res){
  res.redirect('/')
})
const port = process.env.PORT || 5355; 
// Use the environment variable PORT or fallback to 5355

app.listen(port, function () {
  console.log(`Server is running on port ${port} 😁`);
});

