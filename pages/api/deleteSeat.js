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
  if (req.method === "DELETE") {
    try {
      const { busNo, seatNo } = req.body;
      console.log("bbb", busNo, seatNo);
      // Connect to the database
      const client = await ConnectToDatabase();
      const db = client.db("my-site");
      const collection = db.collection("buslist");

      // Find the bus by busNo
      const bus = await collection.findOne({ "formData.busNo": busNo });
      console.log("busdetails", bus);
      if (!bus) {
        // If the bus is not found, return an error
        client.close();
        return res.status(404).json({ error: "Bus not found" });
      }

      // Find the seat by seatNo
      const seatIndex = bus.formData.seats.findIndex(
        (seat) => seat.seatNo === seatNo
      );
      console.log("seatindex", seatIndex);
      if (seatIndex === -1) {
        // If the seat is not found, return an error
        client.close();
        return res.status(404).json({ error: "Seat not found" });
      }

      // Update the booked status to false and other values to null
      bus.formData.seats[seatIndex] = {
        seatNo: bus.formData.seats[seatIndex].seatNo,
        price: bus.formData.seats[seatIndex].price,
        booked: false,
        name: "",
        gender: "",
        age: "",
        berth: bus.formData.seats[seatIndex].berth,
        seat_type: bus.formData.seats[seatIndex].seat_type,
        reserved: "",
      };

      // Update the bus in the database
      await collection.updateOne({ _id: new ObjectId(bus._id) }, { $set: bus });

      // Close the database connection
      client.close();

      // Send a success response
      res.status(200).json({ message: "Seat updated successfully" });
    } catch (error) {
      console.error("Error updating seat:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle other HTTP methods if needed
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
