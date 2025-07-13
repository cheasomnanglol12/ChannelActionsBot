import { cleanEnv, str } from "envalid";

const envVars = {
  BOT_TOKEN: "8185070140:AAEIOWKyA5gENgmQiTcJEhem92h1721dOrM",
  OWNERS: "1439771387",
  MONGO_URL:
    "mongodb+srv://NANG:NANG2026@cluster0.ivg1ibm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
};

const reporter = ({ errors }: { errors: Record<string, Error> }) => {
  if (Object.keys(errors).length === 0) return;

  console.error("❌ Missing or invalid environment variables:");
  for (const [key, error] of Object.entries(errors)) {
    console.error(`- ${key}: ${error?.message || "Missing or invalid"}`);
  }

  throw new Error("Environment validation failed.");
};

const env = cleanEnv(envVars, {
  BOT_TOKEN: str({ desc: "Telegram bot token" }),
  OWNERS: str({ desc: "Comma-separated Telegram owner IDs" }),
  MONGO_URL: str({ desc: "MongoDB connection string" }),
}, { reporter });

export default env;
