const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const PATHS = {
  root: path.resolve(__dirname, '..'),
  nodeModules: path.resolve(__dirname, '../node_modules'),
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
};

const DEV_SERVER = {
  port: 3000,
  hot: true,
  hotOnly: true,
  historyApiFallback: true,
  inline: true,
  // It suppress error shown in console, so it has to be set to false.
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  compress: true,
  overlay: {
    warnings: true,
    errors: true
  }
}

module.exports = (env = {}) => {
  const isBuild = !!env.build;
  const isDev = !env.build;
  const entry = isDev ? [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000/', // WebpackDevServer host and port
    // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    PATHS.src + '/index.tsx',
  ] : [
      PATHS.src + '/index.tsx',
    ]
  const PUBLIC_PATH = isDev ? '/' : './';

  return {
    node: {
      fs: 'empty'
    },
    cache: true,
    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: DEV_SERVER,
    context: PATHS.root,
    entry: {
      'main': entry
    },
    output: {
      path: PATHS.dist,
      publicPath: PUBLIC_PATH,
      filename: isDev ? 'js/[name].js' : 'js/[name].[hash].js',
      // chunkFilename: '[id].bundle.js',
    },
    resolve: {
      modules: ['src', 'node_modules/'],
      descriptionFiles: ['package.json'],
      extensions: ["config.js", ".ts", ".tsx", ".js", ".jsx", ".json"],
      modules: ['src', 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader', 'source-map-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          use: ['babel-loader', 'awesome-typescript-loader'],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader', {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')]
              }
            },
          ],
        },
        {
          test: /\.scss$/,
          loaders: [
            'style-loader',
            'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|gif|woff|ico|cur)$/,
          loader: 'url-loader?limit=1500&name=images/[hash:6].[ext]'
        },
        // fonts
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&name=dist/fa/[hash].[ext]&mimetype=application/font-woff"
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader?name=dist/fa/[hash].[ext]"
        }
      ]
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: [],
    plugins: [


      new CopyWebpackPlugin([
        {
          from: PATHS.root + '/assets',
          to: PATHS.dist + '/assets',
          toType: 'dir',
          ignore: ['*.html'],
          force: true,
        }
      ]),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
      }),
      new HtmlWebpackPlugin({
        template: PATHS.root + '/index.html',
        inject: 'body',
      }),

      ...(isDev ? [
        new webpack.HotModuleReplacementPlugin({
          multiStep: false, // better performance with many files
        }),
        new webpack.NamedModulesPlugin(),
      ] : []),

      ...(isBuild ? [
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
        }),
        new UglifyJsPlugin({
          sourceMap: isDev ? true : false,
          uglifyOptions: {
            output: {
              comments: false,
              beautify: false,
            },
            ie8: true,
          }
        }),
      ] : []),
      new OfflinePlugin(),
    ],
  };
}
