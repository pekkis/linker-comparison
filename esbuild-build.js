import * as esbuild from "esbuild";
import rimraf from "rimraf";
import { promisify } from "util";
import fs from "fs/promises";

import { createHtml } from "./util.js";

const rm = promisify(rimraf);

const finder = (what, outputFiles) => {
  const f = outputFiles.find((of) => {
    return of.path.match(what);
  });

  if (!f) {
    console.log(what);
    return "???";
  }

  const fp = f.path.split("/").pop();
  return fp;
};

try {
  await rm("./build-esbuild/out");
  await fs.mkdir("./build-esbuild/out");

  const ret = await esbuild.build({
    define: {
      API: JSON.stringify(process.env.REACT_APP_API)
    },
    splitting: true,
    format: "esm",
    entryPoints: ["./src/index.jsx"],
    bundle: true,
    outdir: "./build-esbuild/out",
    loader: { ".png": "file" },
    minify: true,
    entryNames: "[dir]/[name]-[hash]",
    write: false
  });

  for (const out of ret.outputFiles) {
    console.log("Writing da file", out.path);
    await fs.writeFile(out.path, out.contents);
  }

  const indexHtml = finder(/index-(.*).js$/, ret.outputFiles);
  const indexCss = finder(/index-(.*).css$/, ret.outputFiles);

  await createHtml({
    indexHtml: `/out/${indexHtml}`,
    indexCss: `/out/${indexCss}`
  });

  console.log("FUCKING DONE.");
} catch (e) {
  console.log(e);
  process.exit(1);
}
