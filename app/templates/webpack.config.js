const path = require('path');
const packageData = require("./package.json");
module.exports = {
    entry: './src/library.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: `${packageData.name}.js`,
        libraryTarget: 'umd',
        library: 'projectNameNoDashes' //this will be the global variable to hook into
    },
    module:{
        rules:[
            {  
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    },
    externals: {

    },
    devtool: 'source-map'
};

