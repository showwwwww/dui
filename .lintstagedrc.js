module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix --max-warnings 0'],
  '*.{json,md,html,css,scss}': ['prettier --write'],
};
