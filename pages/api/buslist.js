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
  //
  // } else {
  const client = new MongoClient(uri);
  await client.connect();
  // cachedClient = client;
  return client;
  // }
}

export default async function handler(req, res) {
  // ==================================================POST================================================================================
  if (req.method === "POST") {
    try {
      const { formData } = req.body;

      const client = await ConnectToDatabase();
      const db = client.db("my-site");
      const collection = db.collection("buslist");
      const existingBus = await collection.findOne({
        "formData.busNo": formData.busNo,
      });

      if (existingBus) {
        client.close();
        return res.status(400).json({ message: "Bus number already exists" });
      }
      const result = await collection.insertOne({ formData });
      client.close();
      res.status(200).json({ message: "Message stored successfully" });
    } catch (error) {
      console.error("Error storing message:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // ==================================================DELETE================================================================================
  else if (req.method === "DELETE") {
    try {
      const { _id } = req.body;

      const client = await ConnectToDatabase();
      const db = client.db("my-site");
      const collection = db.collection("buslist");

      // Use ObjectId to create an object ID from the provided string
      const objectId = new ObjectId(_id);

      // Delete the bus with the specified ID
      const result = await collection.deleteOne({ _id: objectId });

      client.close();
      res.status(200).json({ message: "Bus deleted successfully" });
    } catch (error) {
      console.error("Error deleting bus:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // ==================================================PUT===============================================================================
  else if (req.method === "PUT") {
    try {
      const { busNo, selectedSeats, seatDetails } = req.body;

      const client = await ConnectToDatabase();
      const db = client.db("my-site");
      const collection = db.collection("buslist");

      // Fetch the current seats array from the bus document
      const existingBus = await collection.findOne({ "formData.busNo": busNo });

      const existingSeats = existingBus ? existingBus.formData.seats : [];

      // Update details for each selected seat

      selectedSeats.forEach((selectedSeat) => {
        let reserv = 0;
        const seatIndex = existingSeats.findIndex(
          (seat) => seat.seatNo === selectedSeat
        );
        const seatIndexx = seatDetails.findIndex(
          (seat) => seat.seatNo === selectedSeat
        );
        if (selectedSeat >= 6 && selectedSeat <= 15) {
          reserv += 10;
        }
        if (selectedSeat >= 16 && selectedSeat <= 25) {
          reserv -= 10;
        }
        if (selectedSeat >= 31 && selectedSeat <= 35) {
          reserv += 5;
        }
        if (selectedSeat >= 36 && selectedSeat <= 40) {
          reserv -= 5;
        }
        if (
          !existingBus.formData.seats[seatIndex + reserv].booked &&
          seatDetails[seatIndexx].gender === "female"
        ) {
          existingBus.formData.seats[seatIndex + reserv] = {
            seatNo: existingBus.formData.seats[seatIndex + reserv].seatNo,
            price: existingBus.formData.seats[seatIndex + reserv].price,
            booked: false,
            name: existingBus.formData.seats[seatIndex + reserv].name,
            gender: existingBus.formData.seats[seatIndex + reserv].gender,
            age: existingBus.formData.seats[seatIndex + reserv].age,
            berth: existingBus.formData.seats[seatIndex + reserv].berth,
            seat_type: existingBus.formData.seats[seatIndex + reserv].seat_type,
            reserved: true,
          };
        }

        // ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        existingBus.formData.seats[seatIndex] = {
          seatNo: existingBus.formData.seats[seatIndex].seatNo,
          price: existingBus.formData.seats[seatIndex].price,
          booked: true,
          name: seatDetails[seatIndexx]?.name || "",
          gender: seatDetails[seatIndexx]?.gender || "",
          age: seatDetails[seatIndexx]?.age || "",
          berth: existingBus.formData.seats[seatIndex].berth,
          seat_type: existingBus.formData.seats[seatIndex].seat_type,
          reserved: false,
        };
      });

      // Update the bus document with the modified seats array
      const result = await collection.updateOne(
        { _id: existingBus._id },
        {
          $set: existingBus,
        }
      );

      client.close();

      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Bus updated successfully" });
      } else {
        res.status(404).json({ error: "Bus not found" });
      }
    } catch (error) {
      console.error("Error updating bus:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // ==================================================GET================================================================================
  else {
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
