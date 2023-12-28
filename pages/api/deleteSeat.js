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
      let reserv = 0;

      const { busNo, seatNo } = req.body;
      console.log("bbb", busNo, seatNo);
      if (seatNo >= 6 && seatNo <= 15) {
        console.log("selected seats is between 5 and 15");
        reserv += 10;
      }
      if (seatNo >= 16 && seatNo <= 25) {
        console.log("selected seats is between 5 and 15");
        reserv -= 10;
      }
      if (seatNo >= 31 && seatNo <= 35) {
        console.log("selected seats is between 5 and 15");
        reserv += 5;
      }
      if (seatNo >= 36 && seatNo <= 40) {
        console.log("selected seats is between 5 and 15");
        reserv -= 5;
      }
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
      console.log("reserv number", reserv);
      bus.formData.seats[seatIndex + reserv] = {
        seatNo: bus.formData.seats[seatIndex + reserv].seatNo,
        price: bus.formData.seats[seatIndex + reserv].price,
        booked: bus.formData.seats[seatIndex + reserv].booked,
        name: bus.formData.seats[seatIndex + reserv].name,
        gender: bus.formData.seats[seatIndex + reserv].gender,
        age: bus.formData.seats[seatIndex + reserv].age,
        berth: bus.formData.seats[seatIndex + reserv].berth,
        seat_type: bus.formData.seats[seatIndex + reserv].seat_type,
        reserved: false,
      };
      console.log(bus.formData.seats[seatIndex + reserv]);
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
