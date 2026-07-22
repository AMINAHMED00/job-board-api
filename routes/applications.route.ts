import { Router } from "express";
import { applyToJob, getApplicationsForJob, getMyApplications, updateApplicationStatus } from "../controllers/applications.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { updateApplicationStatusSchema } from "../validations/applications.validation";

const applicationsRouter = Router() ;

applicationsRouter.post('/apply/:jobId' , authMiddleware(["USER"]) , applyToJob) ;
applicationsRouter.get('/my-applications' , authMiddleware(["USER"]) , getMyApplications) ;
applicationsRouter.get('/job/:jobId' , authMiddleware(["COMPANY"]) , getApplicationsForJob) ;
applicationsRouter.patch('/update/:applicationId' , authMiddleware(["COMPANY"]) , validate(updateApplicationStatusSchema) , updateApplicationStatus) ;

export default applicationsRouter ;