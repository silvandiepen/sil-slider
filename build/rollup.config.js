// rollup.config.js
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify-es'
import commonjs from 'rollup-plugin-commonjs'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))

const config = {
  external: [
    '@sil/animationframe'
  ],
  input: 'src/index.js',
  output: {
    name: 'slider',
    exports: 'named',
    globals: {
      '@sil/animationframe': 'AnimationFrame'
    }    
  },
  plugins: [
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    }),
    buble()
  ]
}

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(uglify())
}

export default config