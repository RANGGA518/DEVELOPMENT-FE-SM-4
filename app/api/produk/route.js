import { connect } from "@/lib/db";

export async function GET() {
    const db = await connect()
    const [rows] = await db.execute("SELECT * FROM produk")
    return Response.json(rows)
}