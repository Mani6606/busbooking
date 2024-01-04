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
    await client.connect();
    cachedClient = client;
    return client;
  }
}

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const cl = await connectToDB();
        const client = await cl.connect();
        const db = await client.db("my-site");
        const userCollection = await db.collection("userInfo");
        const user = await userCollection.findOne({ Email: credentials.Email });
        console.log("credentaials", user);
        if (!user) {
          throw new Error("User not found");
        }
        console.log("passwordcheck ", credentials.Password, user.Password);
        // if (!(credentials.Password === user.Password)) {
        //   throw new Error("Invalid password please enter correct password");
        //   return;
        // }
        client.close();
        return { email: credentials.Email };
      },
    }),
  ],
};
export default NextAuth(authOptions);
