const config = {
  "*.{ts,tsx,js,mjs}": ["eslint --max-warnings=0", "prettier --write"],
  "*.{json,css,md}": "prettier --write",
};
export default config;
