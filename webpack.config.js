module.exports = {
  entry: './index.js',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  output: {
    path: __dirname,
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  }
}
