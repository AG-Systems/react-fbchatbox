const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.jsx?$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/ 
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: './docs',
        compress: true,
        disableHostCheck: true, 
        public: 'http://webpack-ag-systems.c9users.io'
    }
};
