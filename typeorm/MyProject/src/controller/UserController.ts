import { getRepository } from "typeorm";
import { NextFunction,Request,Response } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator";

export class UserController{
    static getAll=async(req: Request, res: Response)=>{
        const userRepository=getRepository(User);
        let users;
        try {
            users=await userRepository.find();
        } catch (error) {
            res.status(404).json({message:'Something goes wrong'});
        }
        

        if (users.length > 0) {//si hay mas de un usuario
            res.send(users);
        } else {
            res.status(404).json({message:'Not result'});
        }
    };
    //consultar por ID
    static getById=async(req: Request, res: Response)=>{
        const {id}=req.params;
        const userRepository=getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        } catch (error) {
            res.status(404).json({message:'Not result'});
        }
    };
    //registrar un nuevo usuario
    static newUser=async( req: Request, res: Response)=>{
        const {username,password,role}=req.body;
        console.log(req.body);
        const user=new User();

        user.username=username;
        user.password=password;
        user.role=role;

        //validate
        const validationOpt={validationError:{target:false,value:false}};//si falta algun dato marcara error
        const errors = await validate(user,validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        } 
        //TODO HASH:PASSWORD
        const userRepository = getRepository(User);
        try {
            user.hashpassword();
            await userRepository.save(user);//guardar
        } catch (error) {
            return res.status(404).json({message:'username already exists'});
        }
        //all ok
        res.send('User created');
    };

    static editUser = async ( req: Request, res: Response)=>{
        let user;
        const{id}=req.params;
        const{username,role}=req.body;

        const userRepository=getRepository(User);
        //try get user
        try {
            user=await userRepository.findOneOrFail(id);
            user.username=username;
            user.role=role;
        } catch (error) {
            return res.status(404).json({message:'User not found'});
        }
        
        const validationOpt={validationError:{target:false,value:false}};
        const errors=await validate(user,validationOpt);//validar

        if(errors.length > 0){
            return res.status(404).json(errors);
        }
        //try to save user
        try {
            await userRepository.save(user);
        } catch (error) {
           res.status(409).json({message:'username already in use'});
        }
        res.status(201).json({message:'user update'});
    };

    static deleteUser=async(req:Request,res:Response)=>{
        const {id}=req.params;
        const userRepository=getRepository(User);
        let user:User;
        try {
            user=await userRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({message:'user not found'});
        }
        //delete user
        userRepository.delete(id);
        res.status(201).json({message:'user delete'});
    };

}

export default UserController;
