const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')

module.exports = {
  entry: path.resolve(process.cwd(), "client/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(css|less|scss)$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client'),
      '@scss': path.resolve(__dirname, 'client/assets', 'style'),
      '@assets': path.resolve(__dirname, 'client', 'assets')
    }
  },
  devServer: {
    contentBase: path.resolve(process.cwd(), "dist"),//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    host:'localhost',
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
          template: path.resolve(process.cwd(), "client/index.html"),
          filename: "index.html",
          favicon: path.resolve(process.cwd(), "client/assets/image/favicon.ico")
      }),
      new webpack.HotModuleReplacementPlugin()
  ]
}