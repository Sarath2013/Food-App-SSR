const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: ['babel-polyfill', './server/index.js'],
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve('server-build'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            encoding: false,
                        },
                    },
                ],
            }
        ]
    }
};