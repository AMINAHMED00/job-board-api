import { Request ,  Response } from "express";
import { user_services } from "../services/users.service";
import { createuserDTO } from "../services/users.service";
import { error } from "node:console";
import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";

const user = new user_services() ;

// Register..
export const Register = async(req : Request , res : Response) =>{
    const data : createuserDTO = req.body ;
    try{
        const find_user = await user.finduserbyemail(data.email);
        if(find_user){
            res.status(409).json({
                msg : "user already exists."
            });
            return;
        }
        const user1 =  await user.creatuser(data);         

        res.status(201).json({
            msg : "user Registered successfully.",
            user : user1
        })
    }
    catch(err){
        res.status(500).json({
            msg :  "server error",
            error : err
        })
    }
}


// login

export const login = async(req : Request , res : Response) =>{
    const {email , password} = req.body ;
    try{
        const find_user = await user.finduserbyemail(email);
        if(!find_user){
            res.status(401).json({
                msg : "user not founded."
            });
            return;
        }   
        const check_pass = await bcrypt.compare(password , find_user.password);
        if(!check_pass){
            res.status(401).json({
                msg : "Invalid password"
            });
            return;
        }
        
        const token = Jwt.sign(
            {userId : find_user.id , role : find_user.role},
            process.env.JWT_SECRET!,
            {expiresIn : "7d"}
        );

        const { password: _, ...safeUser } = find_user;

        res.status(200).json({
            msg : "Login successful",
            user : safeUser,
            token : token
        });

    }
    catch(err){
        res.status(500).json({
            msg : "server error",
            error : err
        })
    }
}


// profile 

export const getProfile = async(req : any , res : Response) =>{
   try{
     const userData = await user.getProfile(req.user.userId) ;

     if(!userData){
        res.status(404).json({
            msg :  "User not found."
        });
        return;
     }

     res.status(200).json({
        user : userData
     });
   }
   catch(err){
    res.status(500).json({
        msg : "server error",
        error : err
    });
   }
}