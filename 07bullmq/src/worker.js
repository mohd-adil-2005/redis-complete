import {Worker} from "bullmq";

import { connection } from "./queue.js";

const worker= new Worker(
    'emails', // email bali queue me se data udhana hai 
    async (job)=>{
        console.log("processing email job", job.id, job.data, job.name);
        (await new Promise((resolve)=> setTimeout(resolve, 2000)));
        console.log("email job completed", job.id);
    },
    {connection}
)


worker.on('completed',(job)=>{
    console.log(`job with id ${job.id} has been completed`);
})
Worker.on('failed', (job,err)=>{
    console.log(`job with id${job.id} hass been failed with err mg id ${err.message}`);
})