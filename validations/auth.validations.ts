import {email, z} from "zod";

export const registerSchema = z.object({
    name : z.string().min(3 , {message : "name must be at least 3 characters long"}),
    email : z.string().email({message : "invalid email format"}),
    password : z.string().min(8 , {message : "password must be at least 8 characters long"}),
});

export const loginSchema = z.object({
    email : z.string().email({message : "invalid email format"}),
    password : z.string().min(1 , "password is required"),
});