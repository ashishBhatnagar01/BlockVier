const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer') // HERE
const route = require('./routes/route.js');

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any()) // HERE
const mongoose = require('mongoose')



mongoose.connect("mongodb+srv://AartiZare:aartizare@cluster0.l0uzu.mongodb.net/Suraj-Db?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('mongodb Rock n Roll on 3000'))
    .catch(err => console.log(err))
   

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});