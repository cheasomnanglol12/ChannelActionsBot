import { config } from "dotenv";
import { cleanEnv, str } from "envalid";

// Only load .env locally, not on Deno Deploy
if (!Deno.env.get("DENO_DEPLOYMENT_ID")) {
  await config({ export: true });
}

// Safe reporter for Deno Deploy (no Deno.exit)
const reporter = ({ errors }) => {
  if (Object.keys(errors).length === 0) return;

  console.error("❌ Missing or invalid environment variables:");
  for (const [key, error] of Object.entries(errors)) {
    console.error(`- ${key}: ${error?.message || "Missing or invalid"}`);
  }

  throw new Error("Environment validation failed.");
};

export default cleanEnv(Deno.env.toObject(), {
  BOT_TOKEN: str({ desc: "Telegram bot token from BotFather" }),
  OWNERS: str({ desc: "Comma-separated Telegram user IDs (e.g. 123456789,987654321)" }),
  MONGO_URL: str({ desc: "MongoDB connection string" }),
}, { reporter });
