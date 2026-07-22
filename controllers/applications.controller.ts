import { Request , Response } from "express";
import { applicationServices } from "../services/applications.service";
import { error } from "node:console";

const applicationService = new applicationServices() ;

export const applyToJob = async(req : any , res : Response) =>{

    try {
        const userId = req.user.userId ;
        const jobId = req.params.jobId ;

        const application = await applicationService.applyToJob(userId , jobId) ;

        res.status(201).json({
            msg : "Applied to job successfully",
            application
        });
    }

    catch(err : any){
        if(err.message === "NotFound"){
            res.status(404).json({
                msg : "Job Not Found" ,
            });
            return ;
        }
        if(err.code === "P2002"){
            res.status(409).json({
                msg : "you already applied to this job" 
            });
            return ;
        }
        res.status(500).json({
            msg : "server error" , 
            error : err
        })
    }
}

export const getMyApplications = async(req : any , res : Response) =>{
    try {
        const userId = req.user.userId ;

        const applications = await applicationService.getMyApplications(userId) ;

        res.status(200).json({
            applications : applications
        });
    }
    catch(err : any) {
        res.status(500).json({
            msg : "server error" ,
            error : err
        });
    }
}

export const getApplicationsForJob = async(req : any , res : Response) =>{
    try {
        const jobId = req.params.jobId ;
        const ownerId = req.user.userId ;

        const applications = await applicationService.getApplicationsForJob(jobId , ownerId) ;

        res.status(200).json({
            applications : applications
        });
    }
    catch(err  :any){
        if(err.message === "Forbidden"){
            return res.status(403).json({
                msg : "Forbidden"
            });
        }
        if(err.message === "NotFound"){
            return res.status(404).json({
                msg : "Job Not Found"
            });
        }
        res.status(500).json({
            msg : "server error" ,
            error : err
        });
    }
}

export const updateApplicationStatus = async(req : any , res : Response) =>{
    try {
        const ownerId = req.user.userId ;
        const applicationId = req.params.applicationId ;
        const newstatus = req.body.status ;

        const updatedApplication = await applicationService.updateApplicationStatus(applicationId , ownerId , newstatus) ;

        res.status(200).json({
            msg : "Application status updated successfully",
            application : updatedApplication
        });
    }
    catch(err : any){
        if(err.message === "Forbidden"){
            return res.status(403).json({
                msg : "Forbidden"
            });
        }
        if(err.message === "NotFound"){
            return res.status(404).json({
                msg : "Application Not Found"
            });
        }
        res.status(500).json({
            msg : "server error" ,
            error : err
        });
    }
}