import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "core/index": "src/core/index.ts",
    "hooks/index": "src/hooks/index.ts",
    "overrides/index": "src/overrides/index.ts",
    "utils/index": "src/utils/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: false,
  external: ["react", "react-dom", "@page-speed/img"],
});
