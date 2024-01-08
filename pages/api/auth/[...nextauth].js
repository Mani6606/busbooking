import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let cachedClient = null;

async function connectToDB() {
  if (cachedClient) {
    return cachedClient;
  } else {
    const client = new MongoClient(uri);
    cachedClient = await client.connect();
    return cachedClient;
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
        let client;

        try {
          const cl = await connectToDB();
          client = await cl.connect();
          const db = await client.db("my-site");
          const userCollection = await db.collection("userInfo");
          const user = await userCollection.findOne({
            Email: credentials.Email,
          });

          if (!user) {
            throw new Error("User not found");
          }

          if (!(credentials.Password === user.Password)) {
            throw new Error(
              "Invalid password. Please enter the correct password"
            );
          }

          return { email: credentials.Email };
        } catch (error) {
          console.error("MongoDB error:", error.message);
          throw error; // Rethrow the error after logging
        } finally {
          if (client) {
            await client.close();
          }
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
