import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors'
import 'dotenv/config'


const app = express();
const port = process.env.PORT||5000;


app.use(express.json());
app.use(cors())

const client = new MongoClient(`${process.env.MONGODB_URI}`);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectedClient = await connectToMongoDB()
const db = connectedClient.db('hireloopdb');
const allUsers = db.collection('usersCollection')



app.get('/', (req, res)=>{
    res.send('hire loop is looping')
})

app.listen(port, ()=>{
    console.log(`hire loop is running on port ${port}`)
})