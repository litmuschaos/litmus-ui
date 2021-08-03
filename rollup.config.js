import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "./src/index.ts",
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
    ...Object.keys(pkg.devDependencies),
    "dayjs/plugin/advancedFormat",
    "dayjs/plugin/isoWeek",
    "dayjs/plugin/weekOfYear",
  ],
  output: [
    {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
    },
    {
      dir: "dist",
      format: "es",
      sourcemap: true,
    },
  ],
  preserveModules: true,
  plugins: [
    commonjs(),
    postcss({
      plugins: [
        require("postcss-easy-import")({ prefix: "_" }), // keep this first
        require("cssnano")({
          preset: "default",
        }),
      ],
    }),
    typescript(),
    terser(),
    image(),
  ],
};
