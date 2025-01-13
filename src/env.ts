import { config } from "dotenv";
import { z } from "zod";

config();

export const EnvSchema = z.object({
  VITE_API_URL: z.string().min(1, "VITE_API_URL is required"),
});

const envObj = {
  VITE_API_URL: process.env.VITE_API_URL,
};
let _env;

try {
  _env = EnvSchema.parse(envObj);
} catch (error) {
  if (!process.env.SKIP_ENV_VALIDATION) {
    console.error(error);
    process.exit(1);
  }
  console.log("SKIP ENV VALIDATION");
}

export const env = _env;
