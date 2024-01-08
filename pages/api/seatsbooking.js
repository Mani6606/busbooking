import { MongoClient, ObjectId } from "mongodb";

const uri =
  "mongodb+srv://user1:user123@cluster0.6gjnvof.mongodb.net/?retryWrites=true&w=majority";
const dbName = "my-site";
let cachedClient = null;

export async function connectToDB() {
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  const dbName = "my-site";
  if (req.method === "POST") {
    try {
      const { _id } = req.body;

      if (!_id) {
        res.status(400).json({ error: "Bus ID is required" });
        return;
      }

      const client = await connectToDB();
      const db = client.db("my-site");
      const collection = db.collection("buslist");
      const objectId = new ObjectId(_id);
      const busDetails = await collection.findOne({ _id: objectId });

      if (!busDetails) {
        res.status(404).json({ error: "Bus not found" });
      } else {
        res.status(200).json(busDetails);
      }

      client.close();
    } catch (error) {
      console.error("Error fetching bus details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
