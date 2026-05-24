import express from "express";
import Redis from'ioredis';
const app = express();


app.use(express.json());
 

const redis = new Redis(process.env.REDIS_URL|| 'redis://localhost:6379');

const BANNER_KEY= "site:banner";

function keyphone(phone){
    return `otp:${phone}`;
}


app.post('/otp', async(req, res)=>{
    const {phone}= req.body;
    const key = keyphone(phone);
    const otp = Math.floor(100000 + Math.random() * 900000);
    await redis.set(key,otp,'EX',300);
    res.json({success:"true",message:`otp for ${phone} is ${otp}`});
})
app.get('/verify',async(req,res)=>{
    const {phone,otp}= req.body;
    if(!phone||!otp){
        return res.json({success:"false",message:"phone and otp are required"});
    }
    const key = keyphone(phone);
    const storedOtp= await redis.get(key);
    if(!storedOtp){
        return res.json({success:"false",message:"otp expired or not found"});
    }
    if(storedOtp !== otp){
        return res.json({success:"false",message:"otp is incorrect"});
    }
    await redis.del(key);
    res.json({success:"true",message:"otp verified successfully"});

})
app.get('/otp/:phone/ttl', async(req, res)=>{
    const {phone}= req.params;
    const key= keyphone(phone);
    const ttl = await redis.ttl(key);
   console.log(ttl);
   res.json({success:"true",message:`otp for ${phone} expires in ${ttl} seconds`});
})

app.listen(3000, () =>{
    console.log("app is running on port 3000");
})