"use server";
import sqlite from "better-sqlite3";
import { revalidatePath } from "next/cache";
const db = sqlite("products.sqlite");
export async function deleteProduct(productId) {
  db.prepare(`DELETE FROM products WHERE id=?`).run(productId);
  revalidatePath("/", "page");
}
