import { build } from "esbuild";
import postcssPlugin from "esbuild-plugin-postcss";
import path from "path";

build({
  entryPoints: ["src/main.tsx"],
  bundle: true,
  minify: true,
  sourcemap: true,
  outdir: "dist",
  target: "esnext",
  format: "esm",
  loader: {
    ".js": "jsx",
    ".ts": "tsx",
    ".css": "css",
  },
  plugins: [postcssPlugin],
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  alias: {
    "~": path.resolve(__dirname, "src"), // Решает проблему с `~`
  },
}).catch(() => process.exit(1));
