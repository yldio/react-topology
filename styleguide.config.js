const webpackConfig = require('joyent-react-scripts/config/webpack.config.dev.js');
const { defaultHandlers } = require('react-docgen');
const dnHandler = require('react-docgen-displayname-handler');
const path = require('path');

module.exports = {
    sections: [
    {
      content: 'README.md'
    },
    {
      name: 'React Topology',
      components: './src/index.js'
    },
  ],
  defaultExample: true,
  title: 'React Topology',
  showUsage: true,
  showSidebar: false,
  webpackConfig,
  handlers: componentPath =>
    defaultHandlers.concat(dnHandler.createDisplayNameHandler(componentPath))
};
