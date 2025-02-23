import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import connectDB from './DB/database.js';
import { eventRouter } from './Routes/event.route.js';
import studyMaterialRoutes from './Routes/studyMaterial.route.js'; 
import path from './Routes/student.route.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Student Routes
app.use('/student',path)

// Study Material Routes
app.use('/notes', studyMaterialRoutes); // Adds all CRUD routes for study materials

app.use('/event', eventRouter)


app.listen(PORT, ()=>{
    console.log('server is running at ',PORT);
    
})

connectDB()