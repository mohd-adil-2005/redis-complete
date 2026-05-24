import { Queue } from 'bullmq';


const connection = {
    host: "localhost",
    port: 6379
}
const emailQueue = new Queue('order-queue', { connection });


module.exports={
    emailQueue,
    connection
}
