import * as esbuild from "esbuild";
import { createServer, request } from "http";
import { createHtml } from "./util.js";

let clients = [];

try {
  await createHtml({
    indexHtml: "/out/index.js",
    indexCss: "/out/index.css"
  });

  const ret = await esbuild.build({
    define: {
      API: JSON.stringify(process.env.REACT_APP_API)
    },
    entryPoints: ["./src/index.jsx"],
    bundle: true,
    outdir: "./build-esbuild/out",
    splitting: true,
    format: "esm",
    loader: { ".png": "file" },
    banner: {
      js:
        ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();'
    },
    watch: {
      onRebuild(error, result) {
        clients.forEach((res) => res.write("data: update\n\n"));
        clients.length = 0;
        console.log(error ? error : "REBUILD HAS BEEN DONE");
      }
    }
  });

  console.log(ret);
  console.log("BUILD DONE!");
} catch (e) {
  console.log("ERRORE FATALE", e);
  process.exit(1);
}

esbuild.serve({ servedir: "./build-esbuild" }, {}).then(() => {
  createServer((req, res) => {
    const { url, method, headers } = req;
    if (url === "/esbuild")
      return clients.push(
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive"
        })
      );

    const path = ~url.split("/").pop().indexOf(".") ? url : `/index.html`; //for PWA with router

    req.pipe(
      request(
        { hostname: "0.0.0.0", port: 8000, path, method, headers },
        (prxRes) => {
          res.writeHead(prxRes.statusCode, prxRes.headers);
          prxRes.pipe(res, { end: true });
        }
      ),
      { end: true }
    );
  }).listen(8888);
});
