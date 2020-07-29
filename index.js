const express =  require('express');
const  app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//Env file configure
dotenv.config();

//Connect to  DB
mongoose.connect(
    process.env.DB_CONNECT,
   { useNewUrlParser: true },
    ()=> {
        console.log("connected to db!");
    }
);

//Middleware 
app.use(express.json());


//Route Middlewers
app.use('/api/user/', authRoute);
app.use('/api/posts', postRoute);

app.listen(3001, () => console.log(" Server up and runing!"));

