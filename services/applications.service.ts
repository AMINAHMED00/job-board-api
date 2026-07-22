import prisma from "../model/prisma";

export class applicationServices {
    constructor(){}

    async applyToJob(userId : string , jobId  : string) {

        const job = await prisma.job.findUnique({
            where : {
                id : jobId
            }
        });

        if(!job){
            throw new Error("NotFound");
        }

        return prisma.application.create({
            data : {
                userId : userId ,
                jobId : jobId ,
                status : "PENDING"
            },
            include : {
                job : {
                    select : {
                        id : true ,
                        title : true ,                        
                    }
                }
            }
        })
    }

    async getMyApplications(userId : string){

        return await prisma.application.findMany({
            where : {
                userId : userId
            } ,
            include : {
                job : {
                    select : {
                        id : true ,
                        title : true ,
                        salary : true ,
                        location : true ,
                        company : {
                            select : {
                                id : true ,
                                name : true
                            }
                        }
                    }
                }
            }
        })
    }

    async getApplicationsForJob(jobId : string , ownerId : string){

        const job = await prisma.job.findUnique({
            where : {
                id : jobId ,
            } ,
            include : {
                company : {
                    select : {
                        id : true ,
                        ownerId : true ,
                        name : true
                    }
                }
            }
        });

        if(!job){
            throw new Error("NotFound");
        }

        if(job.company.ownerId !== ownerId){
            throw new Error("Forbidden");
        }

        return await prisma.application.findMany({
            where : {
                jobId : jobId
            }, 
            include : {
                user : {
                    select : {
                        id : true ,
                        name : true ,
                        email : true
                    }
                }
            }
        });
    }

    async updateApplicationStatus(applicationId : string , ownerId : string , newstatus : "PENDING" | "ACCEPTED" | "REJECTED"){
        
        const apllication = await prisma.application.findUnique({
            where : {
                id : applicationId
            } ,
            include : {
                job :  {
                    include : {
                        company : {
                            select : {                              
                                ownerId : true ,                               
                            }
                        }
                    }
                }
            }
        });

        if(!apllication){
            throw new Error("NotFound");
        }

        if(apllication.job.company.ownerId !== ownerId){
            throw new Error("Forbidden");
        }

       return await prisma.application.update({
            where : {
                id : applicationId
            } ,
            data : {
                status : newstatus
            }
        });
    }
}