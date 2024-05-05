// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import MyLayout from '../../../src/views/home/index.vue'
import './tailwind.css'
import './output.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme
