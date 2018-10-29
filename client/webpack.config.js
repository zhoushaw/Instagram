const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const clientPath = path.resolve(__dirname)
module.exports = {
  entry:{
    main: path.resolve(clientPath, "index.js"),
    login: path.resolve(clientPath, "js/instagram/login/index.js"),
  }, 
  output: {
      publicPath: '/',
      path: path.resolve(process.cwd(), "dist"),
      filename: 'js/[name].js'
  },
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
        test: /\.(png|jpg|gif)$/,
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
      '@': clientPath,
      '@scss': path.resolve(clientPath, 'assets/style'),
      '@assets': path.resolve(clientPath, 'assets'),
      '@components': path.resolve(clientPath, 'js/components')
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
          template: path.resolve(process.cwd(), "index.html"),
          filename: "index.html",
          favicon: path.resolve(process.cwd(), "assets/image/favicon.ico")
      }),
      new webpack.HotModuleReplacementPlugin()
  ]
}