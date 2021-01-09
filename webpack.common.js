const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/dom/index.ts',
        worker: './src/worker/index.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                },
                exclude: /node_modules/
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}'
            },
            typescript: {
                build: true
            }
        }),
        new CopyPlugin({
            patterns: [
                {from: "src/index.html", to: "index.html"},
                {from: "src/favicon.ico", to: "favicon.ico"},
                {from: "node_modules/bootstrap/dist/css/bootstrap.min.css", to: "bootstrap.min.css"},
                {from: "node_modules/bootstrap/dist/css/bootstrap.min.css.map", to: "bootstrap.min.css.map"},
                {from: "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", to: "bootstrap.bundle.min.js"}
            ],
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', 'jsx', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    performance: {
        maxAssetSize: 500000
    }
};
