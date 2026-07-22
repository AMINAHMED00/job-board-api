import { Request , Response } from "express";
import { CompanyService } from "../services/companies.service";
import { createCompanyDTO } from "../services/companies.service";
import { createuserDTO } from "../services/users.service";
import { error } from "node:console";

const companyService  = new CompanyService() ;

export const createCompany = async(req : any , res : Response) =>{
    try {
        const {name  , description} = req.body ;
        const ownerId = req.user.userId ; // الي عامل بي login الي ال token بتاعه هيبعته ال frontend.

        const data : createCompanyDTO = {name  , description , ownerId} ;
        const company = await companyService.createCompany(data) ;

        res.status(200).json({
            msg : "Company created successfully" ,
            company
        });
    }
    catch(err){
        res.status(500).json({
            msg : "server error",
            error : err
        })
    }
}

export const getMyCompanies = async(req : any , res : Response) =>{
    try {
        const ownerId  = req.user.userId ;
        const companies = await companyService.getMyCompanies(ownerId) ;

        res.status(200).json({
            companies
        });
    }
    catch(err){
        res.status(500).json({
            msg : "server error",
            error : err
        })
    }
}

export const updateCompany = async(req : any , res : Response) => {
    try{
        const compantId : string = req.params.id ;
        const ownerId = req.user.userId ;
        const data = req.body ;

        const updated = await companyService.updateCompany(compantId , ownerId , data) ;

        res.status(200).json({
            msg : "Company updated",
            company : updated
        });
    }
    catch(err : any){
        if (err.message === "Forbidden"){
            return res.status(403).json({
                msg :  "Forbidden",
            });
        }
        res.status(500).json({
            msg : "server error",
            error : err
        });
    }
}

export const deleteCompany = async(req : any , res : Response) =>{
    try {
        const companyId : string = req.params.id ;
        const ownerId : string = req.user.userId ;

        await companyService.deleteCompany(companyId , ownerId) ;

        res.status(200).json({
            msg : "Company deleted successfully"
        });
    }
    catch(err : any) {
        if (err.message === "Forbidden") {
            return res.status(403).json({
                msg : "Forbidden"
            });
        }
        res.status(500).json({
            msg : "server error",
            Error : err
        });
    }
}

export const getCompanyById = async(req : any , res : Response) =>{
    try{
        const companyId : string = req.params.id ;

        const company = await companyService.getCompanyById(companyId) ;

        res.status(200).json({
            company
        });
    }
    catch(err : any){
        if(err.message === "NotFound"){
            return res.status(404).json({
                msg : "NouFound",
            });
        }
        res.status(500).json({
            msg : "server error",
            error : err.message
        })
    }
}