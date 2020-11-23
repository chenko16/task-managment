const webpack = require('webpack');
var apiHost;
var excludeDirs = []
var basePath = '/taskmanager'

var setupApi = function (env, options) {

  let isProduction = options.mode === 'production'
  if (!isProduction) {
    console.log("excluding node modules from babel flow")
    excludeDirs.push(/node_modules/)
  }
  console.log("constructing backend url")
  if (process.env.BACKEND_URL) {
    apiHost = process.env.BACKEND_URL
    console.log("backend url variable was passed, using it as backend : ")
  } else {
    console.log("backend env variable was not found, determine api url using mode")
    switch (options.mode) {
      case 'production' :
        // reverse proxy or same port
        console.log("using production mode")
        apiHost = ''
        break;
      default :
        console.log("using development mode")
        apiHost = 'http://localhost:8081'
    }
  }
  console.log("api url is : " + apiHost)
}

module.exports = (env, options) => {

  setupApi(env, options)
  var API_VAR = "'" + apiHost + basePath + '/api' + "'"
  var BASE_VAR = "'" + basePath + "'"
  console.log('Api path :' + API_VAR)
  return {
    entry: ["./src/index.tsx"],
    resolve: {
      extensions: [".ts", ".js", ".tsx", ".png", ".jpeg", ".jpg", ".css"]
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: excludeDirs[0],
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                "@babel/react", "@babel/typescript", [
                  "@babel/env", {
                    targets: {
                      browsers: [
                        "IE >= 10"
                      ]
                    },
                    debug: true
                  }
                ]
              ]
            }
          }
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.html$/,
          loader: 'file-loader?name=[name].[ext]'
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          loader: 'file-loader?name=images/[name].[ext]'
        }
      ]
    },
    output: {
      path: __dirname + "/dist",
      publicPath: '/taskmanager/',
      filename: "bundle.js",
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        __API__: API_VAR,
        __BASE_PATH__: BASE_VAR
      })
    ],
    devtool: 'source-map',
    devServer: {
      contentBase: __dirname + "/dist",
      historyApiFallback: {
        index: 'index.html'
      },
      publicPath: '/taskmanager/',
      hot: true
    }
  }
}
