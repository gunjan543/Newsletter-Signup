const bodyParser=require("body-parser");
const express=require("express");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res) {
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function (req,res) {
  const fname=req.body.FirstName;
  const lname=req.body.LastName;
  const email=req.body.email;

  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us2.api.mailchimp.com/3.0/lists/0c4e0d8bc2";
  const options={
    method: "POST",
    auth:"gunjan:beee4ffdf1000a4bfa80ac193f5dcc3-us2"
}
const request=https.request(url,options,function (response) {
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
      response.on("data",function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res) {
  res.redirect("/");
});
app.listen(process.env.PORT|| 3000,function() {
  console.log("server is running on port 3000");
});

//API KEY
//4beee4ffdf1000a4bfa80ac193f5dcc3-us2
//List ID
//0c4e0d8bc2
