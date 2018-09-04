const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(process.cwd(), "dist"),//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    host:'127.0.0.1',
    port: 7000,
    hot: true,
    inline: true,//实时刷新
    hot: true,//Enable webpack's Hot Module Replacement feature
    compress:true,//Enable gzip compression for everything served
    overlay: true, //Shows a full-screen overlay in the browser
    stats: "errors-only" ,//To show only errors in your bundle
    open:true, //When open is enabled, the dev server will open the browser.
    proxy: {
        "/api": {
            target: "http://localhost:3000",
            pathRewrite: {"^/api" : ""}
        }
    }//重定向
  },
  plugins: [
      new HtmlWebPackPlugin({
          template: path.resolve(process.cwd(), "src/index.html"),
          filename: "index.html"
      }),
      new webpack.HotModuleReplacementPlugin()
  ]
}