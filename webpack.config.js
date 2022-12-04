const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv-webpack');

const ASSETS_PATH = './assets';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const HOSTNAME = 'universal.scene';
const PORT = 4200;
const APP_DIST_PATH = path.resolve(__dirname, './build');

const SENTRY_CONSOLE_LEVELS = IS_PRODUCTION ?
  "['error', 'assert']" :
  "['warn', 'error', 'assert']";

const config = {
  experiments: {
    topLevelAwait: true,
  },
  entry: ['babel-polyfill', './src'],
  output: {
    filename: IS_DEVELOPMENT ? '[name].js' : '[name]-[contenthash].js',
    path: APP_DIST_PATH,
  },
  devServer: {
    static: {
      directory: APP_DIST_PATH,
      staticOptions: {},
      publicPath: '/',
      serveIndex: true,
      watch: true,
    },
    historyApiFallback: true,
    host: HOSTNAME,
    port: PORT,
    compress: true,
    allowedHosts: 'all',
    open: true,
    hot: true,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !IS_PRODUCTION, // avoid adding sourceMappingURL to the styles on production
              esModule: false,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: ASSETS_PATH,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: `./src/app.html`,
      filename: `${APP_DIST_PATH}/index.html`,
      environment: JSON.stringify(process.env.NODE_ENV),
    }),
    new dotenv({
      path: './.env.local',
      defaults: `./.env.${process.env.NODE_ENV}`,
      expand: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'process/browser': path.resolve('./node_modules/process/browser'),
      process: 'process/browser',
    },
    modules: ['./node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
      fs: false,
      querystring: false,
      crypto: false,
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

module.exports = config;
