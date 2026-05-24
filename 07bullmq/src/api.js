import express from "express";
const app = express();
import {emailQueue} from "./queue.js";
import { Backoffs, delay } from "bullmq";

app.use(express.json());




app.post('/welcome-email', async(req, res)=>{
    const {email} = req.body;
    const job1 = await emailQueue.add('welcome-email', {
        to:req.body.to,
        name:req.body.name || "learner",


    },
    {
        attempts:5,
        Backoff:{
            type: "exponential",
            delay:1000
        },

    }
);
    res.json({message:"welcome email added to queue",id: job1.id});
})


app.listen(3000,()=>{
    console.log("app is running on port 3000");
})