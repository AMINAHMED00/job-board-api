import { Request , Response } from "express";
import { jobServices } from "../services/jobs.service";
import { error } from "console";

const jobservices = new jobServices() ;

export const createJob = async(req : any , res : Response) =>{

    try {
        const ownerId = req.user.userId ;
        const data = req.body ;

        const job = await jobservices.createJob(ownerId , data) ;

        res.status(201).json({
            msg : "Job Created.",
            job : job
        });
    }
    catch(err : any){
        if (err.message == "Forbidden"){
            return res.status(403).json({
                msg : "Forbidden"
            });
        }
        res.status(500).json({
            msg : "server error",
            error : err
        });
    }
}

export const getAllJobs = async(req : Request , res : Response) =>{
    try {
        const jobs = await jobservices.getalljobs() ;

        res.status(200).json({
            jobs
        });
    }
    catch(err){
        res.status(500).json({
            msg : "server error",
            error : err
        })
    }
}

export const getJobById = async(req : Request , res : Response) =>{
    try {
        const id  = String(req.params.id) ;

        const job = await jobservices.getJobById(id) ;

        res.status(200).json({
            job
        })
    }
    catch(err : any){
        if (err.message === "NotFound"){
            return res.status(404).json({
                msg : "Job not found"
            });
        }
        res.status(500).json({
            msg : "server error" ,
            error : err
        })
    }
} 

export const updateJob = async(req : any , res : Response) =>{
    try {
        const id = String(req.params.id) ;
        const ownerId : string = req.user.userId ;
        const data : any = req.body ;

        const updated = await jobservices.updateJob(ownerId , id , data) ;

        res.status(200).json({
            msg : "Job updated.",
            job : updated
        });
    }
    catch(err : any){
        if(err.mssage === "NotFound"){
            return res.status(404).json({msg : "Job not found or not yours"});}
        res.status(500).json({
            msg : "server error",
            error : err
        });       
    }
}

export const deleteJob = async(req : any , res : Response) =>{
    try {
        const id = String(req.params.id) ;
        const ownerId : string = req.user.userId ;
        const role : string = req.user.role ;

        await jobservices.deleteJob(id , ownerId , role) ;

        res.status(200).json({
            msg : "Job deleted."
        });
    }
    catch(err : any){
        if(err.massage === "NotFound"){
            return res.status(404).json({msg : "job not found or not yours"});
        }
        res.status(500).json({msg : "server error " , error : err});
        console.log(err);
    }
}

export const searchJobs = async(req : Request , res : Response) =>{
    try {

        const jobs = await jobservices.searchJobs(req.query) ;

        res.status(200).json({
            jobs
        });
    }
    catch(err : any){
        res.status(500).json({
            msg : "server error" ,
            error : err.message
        })
    }
}