import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import connectDB from './DB/database.js';
import { register } from './Controller/student.controller.js';
import { eventRouter } from './Routes/event.router.js';

dotenv.config();
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res)=>{
    res.send('Hello World')
})

app.use('/event', eventRouter)

app.post('/register',register)

app.listen(PORT, ()=>{
    console.log('server is running at ',PORT);
    
})

connectDB()