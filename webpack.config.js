const path = require("path");
const webpack = require("webpack");
const { getEnvVariables } = require("./buildUtil");

module.exports = (env) => {
  console.log("🚀 ~ file: webpack.config.js ~ line 37 ~ env", env);
  const { mode, slug, outputFileName } = getEnvVariables(env);
  return {
    entry: path.join(__dirname, "src", "index.js"),
    mode,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-env"],
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.slug": JSON.stringify(slug),
      }),
    ],
    devServer: {
      contentBase: "./dist",
      hot: false,
      inline: false,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    externals: [
      (_context, request, callback) => {
        if (/^@happeouikit/.test(request)) {
          // Resolve @happeoukit as externals in window
          return callback(null, [
            "Happeouikit",
            request.replace("@happeouikit/", ""),
          ]);
        }
        callback();
      },
      {
        react: "React",
        "react-dom": "ReactDOM",
        "styled-components": "styled",
        jQuery: "jQuery",
      },
    ],
    output: {
      filename: outputFileName,
      path: path.resolve(__dirname, "dist"),
    },
  };
};
