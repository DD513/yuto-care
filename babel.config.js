module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
          alias: {
            "@": "./src",
            "@assets": "./assets",
            "@test-utils": "./test-utils",
          },
        },
      ],
    ],
  };
};
