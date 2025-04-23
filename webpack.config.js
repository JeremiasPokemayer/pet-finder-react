const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const dev = process.env.NODE_ENV == "development";
const liveServer = require("live-server");
const HtmlWebpackPlugin = require("html-webpack-plugin");

if (dev) {
  liveServer.start({
    file: "index.html",
  });
}

module.exports = {
  watch: dev,
  entry: "./src/index.tsx",
  stats: {
    errorDetails: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.module\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { modules: true },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"],
    fallback: {
      process: require.resolve("process/browser"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
