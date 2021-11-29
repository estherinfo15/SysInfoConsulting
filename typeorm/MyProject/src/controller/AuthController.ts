import { getRepository } from "typeorm";
import { Request,Response } from "express";
import { User } from "../entity/User";
import * as jwt from 'jsonwebtoken';
import config from "../config/config";
import { validate } from "class-validator";
class AuthController{
    static login=async(req:Request,res:Response)=>{
        const {username,password}=req.body;//recibo desde el front

        if(!(username && password)){
            return res.status(400).json({message:'username & password are required!'});
        }
        
        const userRepository=getRepository(User);
        let user:User;
        try {
            user=await userRepository.findOneOrFail({where:{username}});//en el campo username buscame username
        } catch (error) {
            return res.status(400).json({message:'username or password incorrect!!'});
        }
        //check password
        if(!user.checkPassword(password)){
            return res.status(400).json({message:'username or Password are incorrect!!'});
        }
        const token=jwt.sign({id:user.id,username:user.username},config.jwtSecret,{expiresIn:'1h'})
        res.send({message:'OK',token});//en caso de que encuentre el usuario lo devolvemos al front
    };
   
    static changePassword=async (req:Request,res:Response) => {
        const {id}= res.locals.jwtPayload;
        const {oldPassword,newPassword}=req.body;
        if(!(oldPassword && newPassword)){
            res.status(400).json({message:'Old password 6 new password are required'});
        }
        const userRepository=getRepository(User);
        let user:User;
        try {
            user=await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(400).json({message:'Something goes wrong!'});
        }
        if(!user.checkPassword(oldPassword)){
            return res.status(400).json({message:'Check you old password'});
        }
        user.password=newPassword;
        const validationOps={validationError:{target:false,value:false}};
        const errors=await validate(user,validationOps);
        if(errors.length>0){
            return res.status(400).json(errors);
        }
        //hash password
        user.hashpassword();
        userRepository.save(user);

        res.json({message:'Password change!'});
    };
}
export default AuthController;