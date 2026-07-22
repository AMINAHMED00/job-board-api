import {z} from "zod" ;

export const updateApplicationStatusSchema = z.object({
    status : z.enum(["PENDING", "ACCEPTED", "REJECTED"] , {
        message : "Status must be one of: PENDING, ACCEPTED, REJECTED"
    }),
});