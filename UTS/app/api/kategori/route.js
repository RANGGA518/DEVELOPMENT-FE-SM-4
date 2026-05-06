import db from "@/app/lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute("SELECT * FROM kategori");
    return Response.json(rows);
  } catch (err) {
    console.log(err);
    return Response.json([]);
  }
}