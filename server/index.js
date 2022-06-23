import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config();


app.use(bodyParser.json({limit:"30mb", extended : false}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:false}));
app.use(cors());

// every routes inside the postRoutes is gonna start with localhost:5000/posts
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL = 'mongodb+srv://google:google123@cluster0.unuxzot.mongodb.net/?retryWrites=true&w=majority';

app.get('/', (req, res)=> {
    res.send("APP IS RUNNING");
} );

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log(`Connection to the database is successful!`);
    app.listen(PORT, ()=> console.log(`Server running on port : ${PORT}`))
}).catch((error)=>{
    console.log(error.message);
});


