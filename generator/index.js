// eslint-disable-next-line no-unused-vars
module.exports = (api, options, rootOptions) => {
  // TODO: Typescript support
  const hasBabel = api.hasPlugin('babel');

  api.extendPackage({
    scripts: {
      'storybook:serve': 'vue-cli-service storybook:serve -p 6006 -c config/storybook',
      'storybook:build': 'vue-cli-service storybook:build -c config/storybook',
    },
    devDependencies: {
      '@storybook/addon-actions': '5.2.0-rc.0',
      '@storybook/addon-knobs': '5.2.0-rc.0',
      '@storybook/addon-links': '5.2.0-rc.0',
      '@storybook/addon-notes': '5.2.0-rc.0',
    },
  });

  if (!hasBabel) {
    api.extendPackage({
      devDependencies: {
        '@babel/core': '^7.4.5',
        'babel-loader': '^8.0.4',
      },
    });
  }

  api.render('./template', { hasBabel });

  // FIXME: Exists until https://github.com/vuejs/vue-cli/issues/1754 is done
  api.onCreateComplete(() => {
    // Linting the generated files
    if (api.hasPlugin('eslint')) {
      // eslint-disable-next-line global-require, import/no-unresolved
      const lint = require('@vue/cli-plugin-eslint/lint');
      lint({ silent: true }, api);
    }
  });
};
