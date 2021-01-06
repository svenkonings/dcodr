const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: {
        main: './src/dom/index.ts',
        worker: './src/worker/index.ts'
    },
    mode: 'production',
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
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}'
            },
            typescript: {
                build: true
            }
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', 'jsx', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
};
