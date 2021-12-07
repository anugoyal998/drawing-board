module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  eslint: {
    enable: process.env.NODE_ENV === 'production' ? false : true,
  }
}