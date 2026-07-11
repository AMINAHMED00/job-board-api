import { Request, Response, Router } from "express";
import { getProfile, login, Register } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const auth = Router();

auth.post('/register' , Register);
auth.post('/login' , login);
// تجربه استخدام ال token
// auth.get('/profile' , authMiddleware() , (req : Request , res : Response)=>{
//     res.json({
//         msg : "You are authenticated",
//         user : (req as any).user
//     })
// })

auth.get('/profile' , authMiddleware() , getProfile);

export default auth ;