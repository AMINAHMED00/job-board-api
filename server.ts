import "dotenv/config" ;
import express from "express";
import auth from "./routes/auth.route";
import CompanyRouter from "./routes/companies.route";
import jobRouter from "./routes/job.route";
import applicationsRouter from "./routes/applications.route";


const app = express() ;
const port : number = Number(process.env.PORT) || 3000 ;

app.use(express.json());
app.use(express.urlencoded({extended :true}));


// api 
//users
app.use('/api/users' , auth)

// company
app.use('/api/company' , CompanyRouter);

//job
app.use('/api/job' , jobRouter);

// applications
app.use('/api/applications' , applicationsRouter);

app.listen(port , ()=>{
      console.log(`server running at => http://localhost:${port} ;`);
});

