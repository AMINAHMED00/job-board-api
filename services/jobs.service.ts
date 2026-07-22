import { error } from "node:console";
import prisma from "../model/prisma";
import { title } from "node:process";

export class jobServices {
    constructor(){}

    async createJob(ownerId : string , body : any){

          const { title, description, location, salary, companyId } = body;

          const company = await prisma.company.findFirst({
            where : {
                id : companyId ,
                ownerId : ownerId
            }
          });

          if(!company){
            throw new Error("Forbidden");
          }

          return prisma.job.create({
            data : {
                title : title ,
                description : description ,
                location : location ,
                salary : salary ,
                companyId : companyId
            }
          });
    }

    async getalljobs(){
      return prisma.job.findMany({
        include : {
          company : {
            select : {
              id : true ,
              name : true
            }
          }
        },
        orderBy : {
          createdAt : "desc"
        }
      });
    }

    async getJobById(jobId : string) {
      const job = await prisma.job.findUnique({
        where : {
          id : jobId
        },
        include : {
          company : {
            select : {
              id : true ,
              name : true ,
            }
          }
        }
      });

      if(!job)
        throw new Error("NotFound");

      return job ;
    }

    async updateJob(ownerId : string , jobId : string , body : any){

      const job = await prisma.job.findFirst({
        where : {
          id : jobId ,
          company : {
            ownerId : ownerId
          }
        }
      });     

      if(!job)
        throw new Error("NotFound");

      const { title, description, location, salary } = body;

      const data : any = {};
        if (title       !== undefined) data.title       = title;
        if (description !== undefined) data.description = description;
        if (location    !== undefined) data.location    = location;
        if (salary      !== undefined) data.salary      = Number(salary);

      return await prisma.job.update({
        where : {
          id : jobId
        },
        data,
      });
    }

    async deleteJob(jobId : string , userId : string , role : string) {
      
      const whereClause = 
        role === "ADMIN"
        ? {id : jobId}
        : {id : jobId , company : {ownerId : userId}};

      const job = await prisma.job.findFirst({
        where : whereClause
      });

      if(!job)
        throw new Error("NotFound");

      return await prisma.job.delete({
        where : {
          id : jobId
        }
      });
    }

    // search...
    async searchJobs(query : any){

      const {
        q,
        location,
        minsalary,
        maxsalary,
        page = 1,
        limit = 10
      } = query ;

      // اضيف فقط الي انا ببحث بي 
      const where : any = {} ;

      if(q){ // ببحث عن كلمه 
        where.OR = [
          {title : {contains : q , mode : "insensitive"}},
          {description : {contains : q , mode : "insensitive"}}
        ];
      }

      if(location){
        where.location = {contains : location , mode : "insensitive"};
      }

      if(minsalary || maxsalary){
        where.salary = {} ;
        if(minsalary) where.salary.gte = Number(minsalary); 
        if(maxsalary) where.salary.lte = Number(maxsalary);
      }

      // دلوقتي لو انا عايز كل صفحه يكون فيها عدد معين من ال jobs 
      // هو هيديني عدد الصفح وكمان كام job لكل صفحه 

      const skip = (Number(page) - 1) * Number(limit) ;
      const take = Number(limit);

      // هنا بقى هجيب عدد ال jobs الي طلعه من ال search بعدين ال jobs نفسها 
      // هستخدم transaction عشان اجيب حاجتين معتمدين ع بعض وكمان مره واحده 
      const [total , jobs] = await prisma.$transaction([
        prisma.job.count({where}) ,
        prisma.job.findMany({
          where ,
          include : {
            company : {
              select : {
                id : true , 
                name : true
              }
            }
          },
          skip ,
          take,
        }),
      ]);

      return {
        jobs ,
        pagination : {
          total ,
          page : Number(page) ,
          limit : Number(limit) ,
          totalpages : Math.ceil(total / Number(limit))
        }
      }
    }
}

// ده جزء ال search
/*
// بحث بكلمة
GET /jobs/search?q=backend

// فلترة بالـ location
GET /jobs/search?location=cairo

// فلترة بالـ salary
GET /jobs/search?minSalary=5000&maxSalary=15000

// pagination
GET /jobs/search?page=2&limit=5

// كل الفلاتر مع بعض
GET /jobs/search?q=node&location=cairo&minSalary=8000&page=1&limit=10
*/