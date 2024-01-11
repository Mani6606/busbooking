import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let cachedClient = null;

async function connectToDB() {
  try {
    // if (cachedClient) {
    //   return cachedClient;
    // } else {
    const client = new MongoClient(uri);
    cachedClient = await client.connect();
    console.log("Connected to MongoDB");
    return cachedClient;
  } catch (error) {
    // }
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
}

const authOptions = {
  secret: "111112222222222111111122212222211111111111",
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        let cl;
        try {
          console.log("Authorizing with credentials:", credentials);
          cl = await connectToDB();
          const db = await cl.db("my-site");
          const userCollection = await db.collection("userInfo");
          const user = await userCollection.findOne({
            Email: credentials.Email,
          });

          if (!user) {
            console.log("User not found");
            throw new Error("User not found");
          }

          if (!(credentials.Password === user.Password)) {
            console.log("Invalid password");
            throw new Error(
              "Invalid password. Please enter the correct password"
            );
          }

          console.log("Authorization successful");
          return { email: credentials.Email };
        } catch (error) {
          console.error("Authorization error:", error.message);
          throw error;
        } finally {
          if (cl) {
            await cl.close();
          }
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
