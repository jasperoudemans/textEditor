const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      new WebpackPwaManifest({
        short_name: "J.A.T.E ",
        name: "Just Another Text Editor",
        // icons: [
        //   {
        //     src: "./assets/images/icon_96x96.png",
        //     type: "image/png",
        //     sizes: "96x96",
        //     purpose: "any maskable",
        //   },
        //   {
        //     src: "./assets/images/icon_128x128.png",
        //     type: "image/png",
        //     sizes: "128x128",
        //     purpose: "any maskable",
        //   },
        //   {
        //     src: "./assets/images/icon_192x192.png",
        //     type: "image/png",
        //     sizes: "192x192",
        //     purpose: "any maskable",
        //   },
        //   {
        //     src: "./assets/images/icon_512x512.png",
        //     type: "image/png",
        //     sizes: "512x512",
        //     purpose: "any maskable",
        //   },
        // ],
        orientation: "portrait",
        display: "standalone",
        publicPath: "./",
        start_url: "./",
        description: "Takes notes with JavaScript syntax highlighting",
        background_color: "#225ca3",
        theme_color: "#225ca3",
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/transform-runtime"],
            },
          },
        },
      ],
    },
  };
};
