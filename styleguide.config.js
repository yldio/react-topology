module.exports = {
  components: "src/components/**/[A-Z]*.js",
  defaultExample: true,
  title: "Styleguidist Boilerplate",
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        }
      ]
    }
  }
};
