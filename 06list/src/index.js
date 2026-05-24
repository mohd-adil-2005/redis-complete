import express, { json } from "express";

import Redis from "ioredis";

const qKey = 'emailQueue';
const app = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.post('/email', async (req, res) => {

    const job = {
        to: req.body.to || "asif@example.com",
        subject: req.body.subject || "hello how are you software engineers",
        body: req.body.body || "No content",
        createdAt: new Date().toISOString(),
    };

    await redis.lpush(qKey, JSON.stringify(job));

    res.json({
        success: true,
        message: "Email job added to queue"
    });
});

app.get('/email/process', async(req, res)=>{
    const jobData= await redis.rpop(qKey);
    if(!jobData){
        return res.json({message:"No email jobs in the queeue"});

    }
    const job = JSON.parse(jobData);
    res.json({success:"true",message:"Email job processed",data:job});
})
app.listen(3000, ()=>{
    console.log("app is running on port 3000 of 06th lecture");
})