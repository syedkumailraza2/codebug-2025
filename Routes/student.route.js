import { Router } from "express";
import protect from "../Middleware/auth.middleware.js";
import { deleteStudentByAdmin, loginStudent, 
    logoutStudent, register, updateStudent } from "../Controller/student.controller.js";


const path = Router()

path.post('/register',register)
path.post('/login',loginStudent)
path.post('/logout',protect,logoutStudent)
path.put('/:id',protect,updateStudent)
path.delete('/:id',protect,deleteStudentByAdmin)

export default path