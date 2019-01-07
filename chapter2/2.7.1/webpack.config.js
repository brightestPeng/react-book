
const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode:"development",
    entry:path.resolve(__dirname,"index.js"),
    devServer:{
        port:3000,
        hot:true
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name].[hash].js"
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:"babel-loader"
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new htmlWebpackPlugin({
            template:path.resolve(__dirname,"index.html")
        })
    ]
}