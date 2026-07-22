import {z} from "zod";

export const createCompanySchema = z.object({
    name : z.string().min(3 , {message : "name must be at least 3 characters long"}),
    description : z.string().min(10 , {message : "description must be at least 10 characters long"}),
});

export const updateCompanySchema = createCompanySchema.partial() ; // partial means all fields are optional