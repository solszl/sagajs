/*
 * @Description:
 * @Author: xg-a06
 * @Date: 2019-05-20 23:11:06
 * @LastEditTime: 2019-07-22 18:55:29
 * @LastEditors: xg-a06
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const config = require('./config')
const version = require('../package.json').version
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

const isProd = process.env.NODE_ENV === 'production'

const baseConfig = {
  target: 'web',
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? '' : 'source-map',
  entry: {
    Saga: resolve('src/index.js'),
    'demo/test': resolve('demo/viewContainer.js'),
    'demo/mpr': resolve('demo/mprIndex.js')
  },
  output: {
    filename: '[name].js',
    path: resolve(`dist/${version}/${process.env.BUILD_ENV}`),
    library: '[name]',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'happypack/loader?id=happy-babel',
        include: [resolve('src'), resolve('demo')]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('demo/index.html'),
      filename: 'demo/index.html',
      inject: 'body',
      minify: true,
      chunks: ['demo/test']
    }),
    new HtmlWebpackPlugin({
      template: resolve('demo/mpr.html'),
      filename: 'mpr.html',
      inject: 'body',
      minify: true,
      chunks: ['demo/mpr']
    }),
    new HappyPack({
      id: 'happy-babel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: true // 启用缓存
          }
        }
      ],
      threadPool: HappyPack.ThreadPool({ size: os.cpus().length })
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}

module.exports = () => {
  let exConfig = {}
  if (process.env.NODE_ENV === 'local') {
    exConfig = {
      devServer: config.devServer
    }
  } else {
    exConfig = {
      output: {
        publicPath: `/${version}/${process.env.BUILD_ENV}/`
      },
      optimization: {
        minimize: true
      },
      plugins: [
        new CleanWebpackPlugin(),
        new ProgressBarPlugin({
          format:
            '  build [:bar] ' +
            chalk.green.bold(':percent') +
            ' (:elapsed seconds)'
        })
      ].concat(
        process.env.BUILD_ENV === 'analyze' ? [new BundleAnalyzerPlugin()] : []
      )
    }
  }
  return merge(baseConfig, exConfig)
}
