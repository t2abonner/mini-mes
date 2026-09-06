export const stylelintConfig = {
  extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
  plugins: ["stylelint-order"],
  rules: {
    "order/properties-alphabetical-order": true,
    "selector-class-pattern": null,
    "custom-property-pattern": null,
  },
  ignoreFiles: ["**/node_modules/**", "**/dist/**", "**/storybook-static/**"],
};
