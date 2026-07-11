import prisma from "../model/prisma";
import bcrypt from "bcrypt";

export interface createuserDTO {
    name : string,
    email : string,
    password : string,
    role?: "USER" | "COMPANY";
}

export class user_services {
    constructor(){}

    async getProfile(userId : string){
        return prisma.user.findUnique({
            where :{
                id : userId
            },
            select : {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            }
        })
    }

    async finduserbyemail(email : string) {
        return await prisma.user.findUnique({
            where : {
                email : email
            },
            select : {
                id: true,
                name: true,
                email: true,
                password: true,
                role: true,
            }
        })
    }

    async creatuser(data : createuserDTO){        
        const hashpass = await bcrypt.hash(data.password, 10);
        return await prisma.user.create({
            data : {
                name : data.name,
                email : data.email,
                password : hashpass,
                role: data.role ?? "USER"
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                },
        });
    }


}