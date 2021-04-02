module.exports = {
  mode: 'production',

  entry: {
    'clipkit-1.0': './src/index.ts',
  },
  output: {
    filename: '[name].min.js',
    path: __dirname + '/dist',
    libraryTarget: 'umd',
    globalObject: 'this',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
