import { defineConfig } from "drizzle-kit";

import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
