
import express from "express";
import Redis from  "ioredis";


const app= express();

app.use(express.json());
const publisher= new Redis(process.env.REDIS_URL || 'redis://localhost:6379');


app.post('/notify', async(req, res)=>{
    const payload={
        title: req.body.title || "default  title",
        message: req.body.message || "default message",
        createdAt: new Date().toISOString(),
    }
    const receiver = await publisher.publish('notification', JSON.stringify(payload));
    res.status(200).send("Notification sent to subscribers: " + receiver);
})







app.listen(3000, () => {
    console.log("API server is running on port 3000");
});
