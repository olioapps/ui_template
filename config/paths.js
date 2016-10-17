// TODO: we can split this file into several files (pre-eject, post-eject, test)
// and use those instead. This way we don't need to branch here.

var path = require('path');

function resolve(relativePath) {
  return path.resolve(__dirname, relativePath);
}

module.exports = {
  appBuild: resolve('../build'),
  appHtml: resolve('../index.html'),
  appPackageJson: resolve('../package.json'),
  appSrc: resolve('../src'),
  appNodeModules: resolve('../node_modules'),
  ownNodeModules: resolve('../node_modules')
};
