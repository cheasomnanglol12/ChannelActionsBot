// No dotenv, no Deno.env — just hardcoded constants using envalid for structure

import { cleanEnv, str } from "envalid";

// Use hardcoded values directly
const envVars = {
  BOT_TOKEN: "8185070140:AAEIOWKyA5gENgmQiTcJEhem92h1721dOrM",
  OWNERS: "1439771387",
  MONGO_URL: "mongodb+srv://NANG:NANG2026@cluster0.ivg1ibm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
};

// You can still use cleanEnv for validation/structure, or skip it entirely
export default cleanEnv(envVars, {
  BOT_TOKEN: str({ desc: "Telegram bot token" }),
  OWNERS: str({ desc: "Comma-separated Telegram owner IDs" }),
  MONGO_URL: str({ desc: "MongoDB connection string" }),
});
