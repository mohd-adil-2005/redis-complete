import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";


const app = express()
const port = 3000

const redis = new Redis(process.env.REDIS_URL|| 'redis://localhost:6379');
app.get('/redis',async (req, res)=>{
    const result = await redis.ping();
    console.log(result);
    res.send(result);
})
app.get('/mongoose', async(req, res)=>{
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017/mongo-container';
    if(mongoose.connection.readyState===0){
        await mongoose.connect(url);
    }
    res.json({mongo:"connected",database:mongoose.connection.db.databaseName});
})
app.get('/', (req, res) => {
  res.send('Hello World this is redis tutorial actully now  !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})