/*
 * babel.config.js used to support a UMD built version of Mirador that is
 * compatible with IE11 and Edge.
 */

// eslint-disable-next-line func-names
module.exports = function (api) {
  const isDevelopmentEnv = api.env('development');
  const isProductionEnv = api.env('production');
  const isTestEnv = api.env('test');

  const presets = [
    isTestEnv && [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: {
          node: 'current',
        },
      },
      '@babel/preset-react',
    ],
    (isProductionEnv || isDevelopmentEnv) && [
      '@babel/preset-env',
      {
        corejs: 3,
        exclude: ['transform-typeof-symbol'],
        forceAllTransforms: true,
        modules: false,
        useBuiltIns: 'entry',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: isDevelopmentEnv || isTestEnv,
        useBuiltIns: true,
      },
    ],
  ].filter(Boolean);

  const plugins = [
    'babel-plugin-macros',
    '@babel/plugin-transform-destructuring',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        useBuiltIns: true,
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: false, // Needed to support IE/Edge
        regenerator: true,
      },
    ],
    [
      '@babel/plugin-transform-regenerator',
      {
        async: false,
      },
    ],
    ['transform-react-remove-prop-types',
      {
        ignoreFilenames: ['node_modules'],
        removeImport: true,
      },
    ],
    ['lodash', {
      id: [
        'lodash',
      ],
    },
    ]];

  return {
    plugins,
    presets,
  };
};
