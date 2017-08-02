const path = require('path');
const webpack = require('webpack');
const packageData = require("./package.json");
const env  = require('yargs').argv.env;

let entryPoint = './src/library.js';
let plugins = [];
let output = null;
let external = {};

if (env === 'dev' || env === 'build') {
    entryPoint = './src/library.js';
    output = {
        path: path.resolve(__dirname, "./dist"),
        filename: `${packageData.name}.js`,
        libraryTarget: 'umd',
        library: 'SET THIS' //this will be the global variable to hook into
    };

    external.jquery = {
        commonjs: 'jquery',
        commonjs2: 'jquery',
        amd: 'jquery',
        root: '$'
    };
    external['pd-sputil'] = {
        commonjs: 'pd-sputil',
        commonjs2: 'pd-sputil',
        amd: 'pd-sputil',
        root: 'pdsputil'
    };
}
if(env === 'build') {
    let UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin();
    let prodTrigger = new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    });
    output.filename = `${packageData.name}.min.js`;
    plugins.push(prodTrigger, UglifyJsPlugin);
}
if(env === 'test') {
    entryPoint = './project_tests.js';
    output = {
        path: path.resolve(__dirname, "./tests"),
        filename: 'SET THIS', //file name for compiled testing file
    };
    //external['./src/library.js'] = "pdspserverjsom";
    external.jquery = "jQuery";
    //external['pd-sputil'] = "pdsputil";
}

module.exports = {
    entry: entryPoint,
    output: output,
    module:{
        rules:[
            {  
                test: /\.js$/,
                //exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["es2015", {"modules": false}],
                            "stage-0"
                        ],
                        plugins: []
                    }
                }
            }
        ]
    },
    plugins: plugins,
    externals: external,
    //devtool: 'source-map'
};

