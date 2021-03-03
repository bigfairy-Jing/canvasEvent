const path = require('path')


module.exports = {
  entry:'./src/index.js',
  output:{
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: "babel-loader",
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true,
    port: 8888,
    host: '127.0.0.1'
  },
  resolve: {
    extensions: [".js"]
  }
}