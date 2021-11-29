import { Request,Response,NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import config from "../config/config";
export const checkJwt=(req:Request, res:Response,next:NextFunction)=>{
    console.log('REQ->', req.headers);
    const token=<string>req.headers['auth'];
    let jwtPayload;
    try {
        jwtPayload=<any>jwt.verify(token,config.jwtSecret);//le pasamos nuestro token
        res.locals.jwtPayload=jwtPayload;
    } catch (error) {
        return res.status(401).json({message:'Not authorized'});
    }
    const {id, username}=jwtPayload;
    const newToken=jwt.sign({id,username},config.jwtSecret,{expiresIn:'1h'});
    res.setHeader('token',newToken);
    //call next
    next();//devuelve el token generado
}