module.exports = {
  extends: 'stylelint-config-standard',
  ignoreFiles: ['src/**/*.snap'],
  rules: {
    'no-empty-source': null,
    'declaration-empty-line-before': [
      'never',
      {
        except: ['after-comment', 'after-declaration', 'first-nested'],
      },
    ],
    'no-missing-end-of-source-newline': null,
  },
};
