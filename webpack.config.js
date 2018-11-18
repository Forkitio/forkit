module.exports = {
    devtool: 'source-map',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    entry: ['babel-polyfill', './src/index.js'],
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  };
  