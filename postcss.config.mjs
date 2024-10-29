/** @type {import('postcss-load-config').Config} */

const postCssConfig = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'tailwindcss/nesting': {},
  },
}

export default postCssConfig
