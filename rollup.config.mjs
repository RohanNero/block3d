import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import css from "rollup-plugin-import-css";
import image from "@rollup/plugin-image";

export default [
  {
    input: "src/index.ts",
    output: { file: "dist/esm/index.js", format: "esm", sourcemap: true },
    plugins: [
      peerDepsExternal(),
      css({
        output: "styles.css",
        minify: true,
        alwaysOutput: true,
      }),
      image(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
