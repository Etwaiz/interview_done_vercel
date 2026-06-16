const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const SRC = path.resolve(__dirname, "src");

// All *.html files inside src/ become separate pages.
const htmlPages = fs
  .readdirSync(SRC)
  .filter((file) => file.endsWith(".html"));

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  const plugins = [
    new MiniCssExtractPlugin({ filename: "css/style.css" }),

    // One HtmlWebpackPlugin per page; JS + CSS are injected automatically.
    ...htmlPages.map(
      (file) =>
        new HtmlWebpackPlugin({
          filename: file,
          template: path.resolve(SRC, file),
          inject: "body",
        })
    ),
  ];

  if (isProduction) {
    // Copy static assets (images, fonts, favicon, ...) into the build.
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "**/*",
            context: SRC,
            globOptions: {
              ignore: ["**/*.{js,jsx,scss,html}"],
            },
            noErrorOnMissing: true,
          },
        ],
      })
    );
  }

  return {
    mode: isProduction ? "production" : "development",
    entry: {
      index: [
        "./src/js/app/index.jsx",
        "./src/scss/style.scss",
        "./src/css/tailwind.css",
      ],
    },
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "js/[name].js",
      clean: true,
    },
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { url: false } },
            "postcss-loader",
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              // Assets are referenced by relative paths and served/copied
              // as-is, so we don't resolve url() through webpack.
              options: { url: false },
            },
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  outputStyle: isProduction ? "compressed" : "expanded",
                  // The SCSS still uses legacy @import; silence the noise.
                  silenceDeprecations: [
                    "import",
                    "global-builtin",
                    "color-functions",
                    "legacy-js-api",
                    "slash-div",
                    "if-function",
                  ],
                },
              },
            },
          ],
        },
      ],
    },

    plugins,

    devServer: {
      static: { directory: SRC },
      client: {
        overlay: { errors: true, warnings: false },
      },
      compress: true,
      port: 9000,
      open: true,
      hot: true,
    },

    performance: { hints: false },
  };
};
