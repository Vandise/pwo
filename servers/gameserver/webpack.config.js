var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: "node",
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "gameserver.js"
  },
  externals: [nodeExternals()],
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel", include: path.join(__dirname, 'src'), exclude: /node_modules/ },
      { test: /\.json$/, loader: "json" },
      { test: /\.ya?ml/, loader: "json!yaml" },
    ],
  },
  resolve: {
    extensions: ["", ".js", ".yml"],
  },
};