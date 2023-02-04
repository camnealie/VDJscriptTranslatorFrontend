const path = require('path');

//https://www.npmjs.com/package/react-refresh-webpack-plugin
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

//https://www.npmjs.com/package/mini-css-extract-plugin
//Extracts CSS into seperate files. It creates a CSS file per JS file which contains CSS.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//https://www.npmjs.com/package/clean-webpack-plugin
//Removes and cleans build folders
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//https://www.npmjs.com/package/html-webpack-plugin
//Simplifies creation of HTML files to serve your webpack bundles. Use this so I can define the index.html literally I think
const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = 'development';

const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new ReactRefreshWebpackPlugin(),
];

module.exports = {
  entry: './src/index.js',
  mode: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'), // output path is required for `clean-webpack-plugin`
    publicPath: '/',
    filename: '[name].[contenthash].js', //added this from example to apply a cash to the js
  },
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'shared',
      minSize: 10000,
      maxSize: 250000,
    },
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        // include: path.resolve(__dirname, 'src'), //new
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          // according to the docs, sass-loader should be at the bottom, which
          // loads it first to avoid prefixes in your sourcemaps and other issues.
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        /**
         * The `type` setting replaces the need for "url-loader"
         * and "file-loader" in Webpack 5.
         *
         * setting `type` to "asset" will automatically pick between
         * outputing images to a file, or inlining them in the bundle as base64
         * with a default max inline size of 8kb
         */
        type: 'asset',

        include: path.resolve(__dirname, 'src'), //new

        /**
         * If you want to inline larger images, you can set
         * a custom `maxSize` for inline like so:
         */
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   },
        // },
      },
      {
        test: /\.jsx?$/, //matches all .js files
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'), //new
        use: {
          // without additional settings, this will reference .babelrc
          loader: 'babel-loader',
          options: {
            /**
             * From the docs: When set, the given directory will be used
             * to cache the results of the loader. Future webpack builds
             * will attempt to read from the cache to avoid needing to run
             * the potentially expensive Babel recompilation process on each run.
             */
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: plugins,

  target: 'web',

  devtool: 'eval-cheap-module-source-map',

  resolve: {
    extensions: ['.js'], //.jsx as well if appropriate
    fallback: {
      util: false,
    },
  },

  // required if using webpack-dev-server
  devServer: {
    client: {
      logging: 'verbose',
      overlay: false,
    },
    historyApiFallback: true, ///this is for react router
    server: 'https',
    hot: true,
    port: 3001,
  },
};
