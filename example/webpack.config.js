const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './index.tsx'),
    output: {
        path: path.resolve(process.cwd(), 'dist'),
    },
    mode: "development",
    devServer: {
        static: {
            directory: path.join(__dirname, "captions"),
            publicPath: "/captions"
        },
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.m?(j|t)sx?$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            presets: ["@babel/env", "@babel/preset-react", "@babel/preset-typescript"]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            inject: 'body'
        })
    ]
};