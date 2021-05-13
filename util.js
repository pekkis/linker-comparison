import fs from "fs/promises";
import ejs from "ejs";

export const createHtml = async (data) => {
  const htmlFile = await fs.readFile("./html.ejs", {
    encoding: "utf-8"
  });
  const htmlTemplate = ejs.compile(htmlFile);
  const html = htmlTemplate(data);
  return await fs.writeFile("./build-esbuild/index.html", html);
};
