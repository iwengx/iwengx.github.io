<template>
  <Layout>
    <template #home-hero-info>
      <div class="w-full max-w-[800px] mx-auto">
        <div class="flex items-center mb-5">
          <div class="avatar mr-4">
            <div v-show="!avaterLoading" class="w-24 rounded-full">
              <img v-if="isClient" src="/logo.png" @load="onAvaterLoad" />
            </div>
            <div v-show="avaterLoading" class="skeleton w-24 h-24 rounded-full shrink-0"></div>
          </div>

          <div>
            <h1 class="text-3xl font-bold mb-3">Hi, I am WengX</h1>
            <p class="text-lg text-gray-light dark:text-gray-dark">
              不定时更新学习
              <span class="line-through">(工作)</span> 过程中遇到有意思的问题和知识点等
            </p>
          </div>
        </div>

        <TechnologyStack class="text-center mb-12" />

        <div>
          <p class="mb-2">Project</p>
          <div class="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <template v-for="item in projects" :key="item.title">
              <ProjectCard v-bind="item" />
            </template>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { provide, watch, onMounted } from 'vue'
import { useData } from 'vitepress'
import { toggleAppearance } from './utils/themeToggle'
import { useClient } from '../../utils/hooks/useClient'
import { useImageLoading } from '../../utils/hooks/useImageLoading'
import type { ProjectCardProps } from './types/index'
import mediumZoom from 'medium-zoom'
import DefaultTheme from 'vitepress/theme'
import ProjectCard from './components/project-card.vue'
import TechnologyStack from './components/technology-stack.vue'

onMounted(() => {
  mediumZoom('[data-zoomable]', {
    background: 'var(--vp-c-bg)',
  })
})

const { Layout } = DefaultTheme

const { loading: avaterLoading, onLoad: onAvaterLoad } = useImageLoading()

provide('toggle-appearance', toggleAppearance(useData))

const { isDark } = useData()
const { isClient } = useClient()

watch(
  isDark,
  () => {
    if (isClient.value) {
      if (isDark.value) {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
      }
    }
  },
  {
    immediate: true,
  },
)

// 项目集
const projects: ProjectCardProps[] = [
  {
    title: '我的世界小肝助手',
    description: '免费无感挂机的宏脚本软件',
    imgSrc: '/minecraft-lil-liver-helper.png',
    href: 'http://wengx.cn',
  },
]
</script>

<style src="./utils/themeToggle.css"></style>

<style>
.medium-zoom-overlay,
.medium-zoom-image--opened {
  z-index: 999;
}
</style>
