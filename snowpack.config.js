// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  env: {
    API: process.env.API
  },
  mount: {
    /* ... */
  },
  plugins: ["@snowpack/plugin-react-refresh"],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out: "./build-snowpack"
    /* ... */
  }
  /*
  optimize: {
    bundle: true,
    minify: true,
    target: "es2018"
  }
  */
};
