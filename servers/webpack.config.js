var path = require('path');
var nodeExternals = require('webpack-node-externals');

var entries = {
  game: ["./src/game/index.js"],
  login: ["./src/login/index.js"],
  map: ["./src/map/index.js"]
};

if (process.env.SERVER) {
  entries = {};
  entries[process.env.SERVER] = [`./src/${process.env.SERVER}/index.js`];
}

module.exports = {
  target: "node",
  entry: entries,
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "[name]-server.js"
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