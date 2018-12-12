/* eslint-env node, commonjs */

require('dotenv').config();

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CompressionPlugin = require('compression-webpack-plugin');

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
    mode: 'development',
    entry: entries,
    output: {
        path: path.resolve(__dirname, './dist'),
        // publicPath: '/dist/',
        filename: 'build.[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            // publicPath: '../'
                        }
                    },
                    // 'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
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
            {
                test: /\.(eot|woff|ttf|svg|woff2)$/,
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
        // publicPath: '/dist/',
        // Content not from webpack is served from ./public, ./assets
        // contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')],

        historyApiFallback: true,
        noInfo: true,
        overlay: true,
    },
    performance: {
        hints: false,
    },
    devtool: 'eval-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),

        new Dotenv({
            // path: './some.other.env', // load this now instead of the ones in '.env'
            // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            // silent: true // hide any errors
        }),

        new VueLoaderPlugin(),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'build.[name].css',
        }),

        new CompressionPlugin({
            test: /\.js$|\.css$|\.html$/,
            algorithm: 'gzip',
            filename: '[path].gz[query]',
            // threshold: 10240,
            minRatio: 0.8
        })
    ],
};

module.exports.plugins = (module.exports.plugins || []).concat(
    Object.keys(entries).map(function (id) {

        const mainFile = entries[id];
        let indexHtml = path.resolve(mainFile, '..', 'index.html');
        if (!fs.existsSync(indexHtml)) {
            indexHtml = './src/index.html';
        }

        return new HtmlWebpackPlugin({
            chunks: ['common', id],
            filename: id + '.html',
            template: indexHtml,
            title: entries[id]
        });
    })
);


if (process.env.NODE_ENV === 'production') {
    module.exports.mode = 'production';
    module.exports.devtool = 'source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ]);

}
