import Student from "../model/User.model.js";

const register = async (req,res)=>{
    //take input from body
    try {
        const { name, email, password } = req.body;
    
        if(!name){
            console.log('name')
        }
        if(!email){
            console.log('email')
        }
        if(!password){
            console.log('pass')
        }
    
        await Student.create({
            name,email,password
        })
    
        res.status(200).json({'message':'successful'})
    } catch (error) {
        console.log('error:',error)
    }
}

export {register}