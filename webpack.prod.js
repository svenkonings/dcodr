const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new HtmlMinimizerPlugin(),
    ]
});
