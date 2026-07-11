import prisma from "../model/prisma";

export interface createCompanyDTO{
    name : string,
    description : string,
    ownerId : string 
}
export class CompanyService {
    constructor(){}

    async createCompany(data : createCompanyDTO){
        return prisma.company.create({
            data : {
                name : data.name ,
                description : data.description ,
                ownerId : data.ownerId
            },
            select : {
                id: true,
                name: true,
                description: true,
                ownerId: true,
            }
        })
    }

    async getMyCompanies(ownerId : string) {
        return prisma.company.findMany({
            where : {
                ownerId : ownerId
            },
            select : {
                id: true,
                name: true,
                description: true,
            }
        })
    }

    async updateCompany(companyId : string , ownerId : string , body : any){

         // حددت الحاجات الي انا عايز اسمح بتعدلها فقط 
        const {name , description} = body ;
        const data : any = {} ;
        if(name) data.name = name ;
        if(description) data.description = description;

        const company = await prisma.company.updateMany({
            where : {
                id : companyId ,
                ownerId : ownerId
            },
            data
        });

        if(company.count === 0){
            throw new Error("Forbidden");
        }

        return prisma.company.findUnique({
            where : {
                id : companyId
            }
        });
    }

    async deleteCompany(companyId : string , ownerId : string) {

        const res = await prisma.company.deleteMany({
            where : {
                id : companyId ,
                ownerId : ownerId
            }
        });

        if(res.count === 0){
            throw new Error ("Forbidden");
        }
        return true ;
    }

    async getCompanyById(companyId : string){
        const company = prisma.company.findUnique({
            where : {
                id : companyId
            },
            include : {
                jobs : true
            }
        });

        if(!company)
            throw new Error("NotFound");

        return company ;
    }
}
