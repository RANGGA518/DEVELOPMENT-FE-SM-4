import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export async function GET() {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("db_toko");
    const products = await db.collection("produk").find().toArray();

    return Response.json(products);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}