module.exports = {
  printWidth: 100,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',

  overrides: [
    {
      files: '*.ejs',
      options: { parser: 'html' },
    },
  ],
};
