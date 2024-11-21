import { defineConfig } from "drizzle-kit";

import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

export default {
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:W0k2YbaLcZFG@ep-tiny-boat-a5rtkkr1.us-east-2.aws.neon.tech/AiFinance?sslmode=require",
    connectionString:
      "postgresql://neondb_owner:W0k2YbaLcZFG@ep-tiny-boat-a5rtkkr1.us-east-2.aws.neon.tech/AiFinance?sslmode=require",
  },
};
