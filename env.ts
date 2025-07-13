import { config } from "dotenv";
import { cleanEnv, str } from "envalid";

await config({ export: true });

// Custom reporter that throws instead of exiting (required for Deno Deploy)
const safeReporter = ({ errors }) => {
  console.error("❌ Environment variable validation failed:");
  for (const [key, error] of Object.entries(errors)) {
    console.error(`- ${key}: ${error.message}`);
  }

  // Throw to prevent deployment without crashing runtime
  throw new Error("Environment validation failed. Check logs above.");
};

export default cleanEnv(Deno.env.toObject(), {
  BOT_TOKEN: str(),
  OWNERS: str(),
  MONGO_URL: str(),
}, { reporter: safeReporter });
