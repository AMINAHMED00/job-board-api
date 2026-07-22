import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createJob, deleteJob, getAllJobs, getJobById, searchJobs, updateJob } from "../controllers/jobs.controller";
import { validate } from "../middlewares/validate";
import { createJobSchema, updateJobSchema } from "../validations/job.validations";

const jobRouter = Router() ;

jobRouter.post('/create' , authMiddleware(["COMPANY"]) , validate(createJobSchema) , createJob);
jobRouter.get('/jobs' , getAllJobs) ;
jobRouter.get('/search' , searchJobs);
jobRouter.get('/:id' , getJobById) ;
jobRouter.patch('/update/:id' , authMiddleware(["COMPANY"]) , validate(updateJobSchema) , updateJob);
jobRouter.delete('/delete/:id' , authMiddleware(["COMPANY" , "ADMIN"]) , deleteJob);


export default jobRouter ;