/* eslint-env node, commonjs */

require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 'dotenv' wrapper - load the .env
const Dotenv = require('dotenv-webpack');

// Glob the entries dynamically/programmatically
const mainFiles = require('glob').sync('./src/**/main.js');
const entries = mainFiles.reduce((acc, mainFile) => {
    const name = path.basename(path.dirname(mainFile));
    acc[name] = mainFile;
    return acc;
}, {});

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        //'vue-style-loader',
                        'css-loader'
                    ],
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'less': 'vue-style-loader!css-loader!less-loader',
                    }
                    // other vue-loader options go here
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    outputPath: 'assets/',
                }
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },
    devServer: {
        // webpack output is served from /dist/
        publicPath: '/dist/',
        // Content not from webpack is served from ./public, ./assets
        contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')],
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
    },
    performance: {
        hints: false,
    },
    devtool: '#eval-source-map',
    plugins: [
        new ExtractTextPlugin('build.[name].css'),

        new Dotenv({
            // path: './some.other.env', // load this now instead of the ones in '.env'
            // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            // silent: true // hide any errors
        }),
    ],
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            },
            uglifyOptions: {
                // comparisons: false,
                typeofs: false,
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    ]);
}
