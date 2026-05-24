import express from "express";
import Redis from'ioredis';
const app = express();


app.use(express.json());
 

const redis = new Redis(process.env.REDIS_URL|| 'redis://localhost:6379');

const BANNER_KEY= "site:banner";
app.post('/banner', async(req, res)=>{
          await redis.set(BANNER_KEY, req.body.message|| "welcome to redis banner here !");
          res.json({success:"true",message:"banner updated"});

})

app.get('/bannerget', async(req, res)=>{
    const msg = await redis.get(BANNER_KEY);
    res.json({success:"true",message:msg});
})

app.delete('/bannerdel', async(req, res)=>{
       const del = await redis.del(BANNER_KEY);
       res.json({success:"true",message:"banner deleted"});
})
app.get('/banner/exist', async(req, res)=>{
    const exist= await redis.exists(BANNER_KEY);
    res.json({success:exist? "true":"false"});
})
app.listen(3000, ()=>{
    console.log("app is running on port 30000");
})