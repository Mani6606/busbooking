// import ConnectToDatabase from "@/util/mongodb";
import { MongoClient } from "mongodb";
import { ObjectId } from "bson";
const uri =
  "mongodb+srv://user1:user123@cluster0.6gjnvof.mongodb.net/?retryWrites=true&w=majority";
const dbName = "my-site";
// let cachedClient = null;
async function ConnectToDatabase() {
  // if (cachedClient) {
  //   return cachedClient;
  //   console.log("cached client");
  // } else {
  const client = new MongoClient(uri);
  await client.connect();
  // cachedClient = client;
  return client;
  // }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { input, input_id } = req.body;
      const timestamp = new Date();
      const client = await ConnectToDatabase();
      const db = client.db("my-site");
      const collection = db.collection("buslist");
      const result = await collection.insertOne({ input, input_id ,timestamp});

      client.close();
      res.status(200).json({ message: "Message stored successfully" });
    } catch (error) {
      console.error("Error storing message:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    try {
      const client = await ConnectToDatabase();
      const db = client.db("my-site");
      const collection = db.collection("buslist");
      const messages = await collection.find({}).toArray();

      

    
      res.status(200).json(messages);
      client.close();
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Internal Server Error   aa" });
    }
  }
}