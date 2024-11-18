import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";
const sql = neon(
  "postgresql://neondb_owner:W0k2YbaLcZFG@ep-tiny-boat-a5rtkkr1.us-east-2.aws.neon.tech/finance-smart?sslmode=require"
);

export const db = drizzle(sql, { schema });
