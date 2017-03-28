
var webpack = require('webpack');
var path = require('path');

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/**
 * ---------- Configuration Parameters ----------
 */
const config = {
    src: path.join( __dirname, "./src/"),
    dest: path.join( __dirname, "/build/"),
    modules: path.join( __dirname, "./node_modules/")
};

module.exports = {
    context: path.join(__dirname, "./src"),
    devtool: "inline-sourcemap",
    entry: './main.js',

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'babel-preset-es2015',
                        'babel-preset-react',
                        'babel-preset-stage-0',
                    ],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            },{
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract('style-loader', [
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ])
            },{
                test: /\.(png|jpg|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=img/[path][name].[ext]&limit=10000',
                //exclude: [config.src + '/font/']
            },
            {
              test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
              loader: "file-loader?name=font/[name].[ext]&limit=10000",
            }
        ]
    },

    stats: { children: false },

    output: {
        pathInfo: false,
        publicPath: '/',
        path: config.dest,
        filename: 'js/[name].js'
    },

    resolve: {
      root: [
        path.resolve(config.src),
        config.src,
        path.join( __dirname, "node_modules")
      ]
    },

    plugins : [
        new ExtractTextPlugin(config.dest + 'css/[name].css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ],

    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],

    sassLoader: {
      includePaths: [
        config.src
        //config.modules
      ]
    }
};
