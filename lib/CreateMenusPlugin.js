const createMenus = require('../lib/createMenus');

const pluginName = 'CreateMenusPlugin';

class CreateMenusPlugin {
  constructor(props) {
    this.options = {
      ...props,
    };
  }
  apply(compiler) {
    compiler.hooks.entryOption.tap(pluginName, () => {
      createMenus(this.options.path);
    });
    if (process.env.NODE_ENV === 'development') {
      compiler.hooks.compilation.tap(pluginName, (compilation) => {
        compilation.hooks.buildModule.tap(pluginName, (Module) => {
          if (Module.resource && Module.resource.indexOf('router.js') >= 0) {
            createMenus(this.options.path);
          }
        });
      });
    }
  }
}
module.exports = CreateMenusPlugin;
