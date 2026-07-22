import {z} from "zod";

export const createJobSchema = z.object({
    title : z.string().min(8 , "at least 8 character") ,
    description : z.string().min(16 , "at least 16 character"),
    location : z.string().min(2 , "Location is required"),
    salary : z.number().positive("Salary must be a positive number")

    //title, description, location, salary, companyId
});

export const updateJobSchema = createJobSchema.partial();