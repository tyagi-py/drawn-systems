import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: ["out/**", "node_modules/**", ".next/**", "worker/**"],
  },
];

export default eslintConfig;
