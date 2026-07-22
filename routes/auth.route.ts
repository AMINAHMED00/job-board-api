import { Request, Response, Router } from "express";
import { getProfile, login, Register } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validations/auth.validations";
import { authLimiter } from "../middlewares/rateLimiter";

const auth = Router();

auth.post('/register' , authLimiter , validate(registerSchema) ,Register);

auth.post('/login' , authLimiter , validate(loginSchema) , login);

auth.get('/profile' , authMiddleware() , getProfile);

export default auth ;