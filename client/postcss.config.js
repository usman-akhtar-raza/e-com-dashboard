import postcssImport from "postcss-import";
import tailwindcssPostCSS from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [postcssImport, tailwindcssPostCSS, autoprefixer],
};
