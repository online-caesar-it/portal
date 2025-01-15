import { z } from "zod";

export const EnvSchema = z.object({
  VITE_API_URL: z.string().min(1, "VITE_API_URL is required"),
  VITE_WS_URL: z.string().min(1, "VITE_WS_URL is required"),
});

const envObj = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
};
let _env;

try {
  _env = EnvSchema.parse(envObj);
} catch (error) {
  if (!import.meta.env.SKIP_ENV_VALIDATION) {
    console.error(error);
    process.exit(1);
  }
  console.log("SKIP ENV VALIDATION");
}

export const env = _env;
