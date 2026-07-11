import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createCompany, deleteCompany, getCompanyById, getMyCompanies, updateCompany } from "../controllers/companies.controller";

const CompanyRouter = Router() ;

CompanyRouter.post('/create' , authMiddleware(["COMPANY"]) , createCompany) ;
CompanyRouter.get('/me' , authMiddleware(["COMPANY"]) , getMyCompanies);
CompanyRouter.get('/:id' , getCompanyById);
CompanyRouter.patch('/update/:id' , authMiddleware(["COMPANY"]) , updateCompany);
CompanyRouter.delete('/delete/:id' , authMiddleware(["COMPANY"]) , deleteCompany);

export default CompanyRouter ;