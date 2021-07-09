const express = require("express");
const myController = require('../Controller/controller');
const mongoose = require('mongoose');
const cors = require("cors");
const fs = require("fs");
const dotenv = require('dotenv').config({path: require("find-config")(".env")});

const Inquiry = require('../Model/InquiryModel');  //model



const app = express();
const port = process.env.PORT;
const dbURL = process.env.DB_URL;
//mongodb+srv://root:MyDBPassword1^@portfolio-cluster.aezwt.mongodb.net/inquiry-db?retryWrites=true&w=majority


app.listen(port, () =>{
   console.log("App is listening on port 5000!");
});

app.use(cors(
    {
       origin: `http://${process.env.HOSTURL}:5000`,
       credentials: true //to allow cookies
    }
)); //this will allow all cors requests
app.use(express.json());
app.use(express.static("public"));

app.use('/controller', myController);






/**** Database ***/
//connecting to database
try {
   mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
   console.log(`Connection Successful!`);
}catch(error){
   console.log(error);
}

const dbInitialStatus = mongoose.connection;
dbInitialStatus.on('error', (error) => console.log(error));
dbInitialStatus.once('open', (error) => console.log(`Connected To Database`));
/*****************/

//Get All
app.get('/inquiries/inquiry/list', async (request, response) =>{
   try {
      const myInquiry = await Inquiry.find();
      response.json(myInquiry);
   }catch(err){
      response.status(500).json({message: err.message});
   }
});

//find by id
app.get(`/inquiries/inquiry/get/:id`, async (request, response) =>{
   try {
      const myInquiry = await Inquiry().findById(request.params.id);
      return (myInquiry === null) ? response.status(404).json({message: err.message}) : response.status(404).json({message: err.message});
   }catch(err){
      response.status(400).json({message: err});
   }
});


app.post('/inquiries/inquiry/new', async (request, response) =>{
   const myInquiry = new Inquiry(response.body);
   /**
    const myInquiry = new Inquiry({
         name : request.body.name,
         phoneNumber: request.body.phoneNumber,
         email: request.body.email,
         message: request.body.message
      });
    */
   try {
      const savedInquiry = await myInquiry.save();
      response.status(201).json(savedInquiry);
   }catch(err){
      response.status(400).json({message: err.message});
   }
});


//update
app.patch(`/inquiries/inquiry/update/:id`, async (request, response) =>{
   try{
      const myInquiry = await Inquiry().findByIdAndUpdate(request.parameter.id);
      myInquiry.save()
   }catch(err){
      response.status(404).json({message: err.message});
   }
});


app.delete(`/inquiries/inquiry/delete/:id`, async (request, response) =>{
   try{
      const myInquiry = await Inquiry.findByIdAndDelete(request.params.id);
      response.status(200).json({message: "Inquiry Deleted Successfully!"});
   }catch(err){
      response.status(404).json({message: err.message});
   }
});



app.get("/time", (request, response) =>{
   var myDate = new Date();
   response.json({time: myDate.getTime()});
});



let someText = "This is a log file for the server";

fs.writeFile("server_log.txt", someText, (err) =>{
   (err) ?  console.log(`Err: ${err}`) : console.log("File Saved!");
});










module.exports = app;