import { resolve } from "path";

export default {
  /**
   * Function that mutates the original webpack config.
   * Supports asynchronous changes when a promise is returned (or it's an async function).
   *
   * @param {object} config - original webpack config.
   * @param {object} env - options passed to the CLI.
   * @param {WebpackConfigHelpers} helpers - object with useful helpers for working with the webpack config.
   * @param {object} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
   **/
  webpack(config, env, helpers, options) {
    // Switch css-loader for typings-for-css-modules-loader
    const cssLoaders = helpers.getLoadersByName(config, "css-loader");
    cssLoaders.forEach(({ loader }) => {
      loader.loader = "typings-for-css-modules-loader";
      loader.options = {
        ...loader.options,
        camelCase: true,
        banner: "// This file is automatically generated from your CSS. Any edits will be overwritten.",
        namedExport: true,
        silent: true,
      };
    });

    // Use any `index` file, not just index.js
    config.resolve.alias["preact-cli-entrypoint"] = resolve(process.cwd(), "src", "index");

    return config; // 追加: 変更を加えたconfigを返す
  },
};
