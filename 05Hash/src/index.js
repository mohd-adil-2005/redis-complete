import express from "express";
import Redis from "ioredis";


const app = express();
app.use(express.json());

const redis  = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
app.get('/redis', async(req, res)=>{
    const ans =await redis.ping();
   console.log(ans);
   res.send(ans);
})


app.post('/user/:id/hash', async(req, res)=>{
    const {id}= req.params;
    await redis.hset(`user:${id}:hash`, req.body);
    res.json({success:"true",message:`user ${id} created/updated`});
})


app.get('/user/:id/hash',async(req,res)=>{
    const{id}= req.params;
    const data = await redis.hgetall(`user:${id}:hash`);
    res.json({success:"true",data}); 
})





app.listen(3000,()=>{
    console.log("app is running on port 30000");
})