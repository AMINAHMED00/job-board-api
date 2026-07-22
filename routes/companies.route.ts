import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createCompany, deleteCompany, getCompanyById, getMyCompanies, updateCompany } from "../controllers/companies.controller";
import { validate } from "../middlewares/validate";
import { createCompanySchema, updateCompanySchema } from "../validations/company.validations";

const CompanyRouter = Router() ;

CompanyRouter.post('/create' , authMiddleware(["COMPANY"]) , validate(createCompanySchema) , createCompany) ;
CompanyRouter.get('/me' , authMiddleware(["COMPANY"]) , getMyCompanies);
CompanyRouter.get('/:id' , getCompanyById);
CompanyRouter.patch('/update/:id' , authMiddleware(["COMPANY"]) , validate(updateCompanySchema) , updateCompany);
CompanyRouter.delete('/delete/:id' , authMiddleware(["COMPANY"]) , deleteCompany);

export default CompanyRouter ;