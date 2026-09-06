import eslintConfigPrettier from "eslint-config-prettier";
import { baseConfig } from "./base.mjs";
import { nodeConfig } from "./node.mjs";
import { prettierConfig } from "./prettier.config.mjs";
import { reactConfig } from "./react.mjs";
import { stylelintConfig } from "./stylelint.config.mjs";

export { baseConfig, nodeConfig, prettierConfig, reactConfig, stylelintConfig };

export const prettierEslintConfig = eslintConfigPrettier;

export function withFiles(configs, files) {
  return configs.map((config) => ({ ...config, files }));
}
