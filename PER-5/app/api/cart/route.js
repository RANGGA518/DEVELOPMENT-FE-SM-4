import { db } from "@/lib/db";

export async function POST(req) {
  const { product_id, qty } = await req.json();

  await db.query(
    "INSERT INTO cart (product_id, qty) VALUES (?, ?)",
    [product_id, qty]
  );

  return Response.json({ message: "Added to cart" });
}

export async function GET() {
  const [rows] = await db.query(`
    SELECT c.*, p.name, p.price
    FROM cart c
    JOIN products p ON p.id = c.product_id
  `);

  return Response.json(rows);
}