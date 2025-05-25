import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Blog - WengX',
  cleanUrls: true,
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'WengX',

    nav: nav(),
    sidebar: sidebar(),

    outline: {
      label: '页面导航',
    },

    editLink: {
      pattern: 'https://github.com/iwengx/iwengx.github.io/blob/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/iwengx/iwengx.github.io' }],

    search: {
      provider: 'local',
      options: searchOptions(),
    },

    footer: {
      copyright: 'Copyright © 2022-present WengX',
    },
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: '首页', link: '/' },
    { text: '文章', link: '/refactorCode/exit-loop' },
    {
      text: '外链',
      items: [
        { text: 'CodePen', link: 'https://codepen.io/iwengx' },
        { text: 'CodeSandbox', link: 'https://codesandbox.io/u/walens' },
        { text: 'GitHub', link: 'https://github.com/iwengx' },
        { text: 'GitHub Gist', link: 'https://gist.github.com/iwengx' },
        { text: 'SackOverflow', link: 'https://stackoverflow.com/users/19663702/walens' },
      ],
    },
  ]
}

function sidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Refactor Code',
      collapsed: false,
      base: '/refactorCode/',
      items: [
        { text: '退出顶层循环', link: 'exit-loop' },
        { text: '返回匹配的字符串', link: 'return-matching-string' },
        { text: 'if 中相同变量的判断', link: 'if-judgment' },
        { text: 'TS 获取函数类型', link: 'get-function-type' },
      ],
    },
    {
      text: 'JavaScript',
      collapsed: false,
      base: '/js/',
      items: [
        { text: '添加事件的注意事项', link: 'add-event' },
        { text: '文件上传进度条功能', link: 'upload-progress' },
      ],
    },
    {
      text: 'Utils',
      collapsed: false,
      base: '/utils/',
      items: [
        { text: '策略模式实现 验证器', link: 'validator' },
        { text: 'Axios 请求取消器', link: 'axiosCanceler' },
        { text: '深度克隆', link: 'deepClone' },
      ],
    },
    {
      text: 'uni-app',
      collapsed: false,
      base: '/uniApp/',
      items: [
        { text: '踩坑集', link: 'development-pitfalls' },
        { text: '实现加载资源等待页面功能', link: 'load-resources' },
      ],
    },
    {
      text: 'Vue',
      collapsed: false,
      base: '/vue/',
      items: [
        { text: '判断 slots 是否传入', link: 'slots' },
        {
          text: '二次封装组件',
          link: 're-encapsulation',
        },
      ],
    },
  ]
}

function searchOptions(): Partial<DefaultTheme.LocalSearchOptions> {
  return {
    locales: {
      root: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '重置搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '输入',
              navigateText: '导航',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'esc'
            }
          }
        }
      }
    }
  }
}