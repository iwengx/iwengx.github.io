<template>
  <div class="project-item transition-all flex items-center p-3 rounded-xl select-none">
    <figure class="mr-3 opacity-80 transition-opacity hover:opacity-100">
      <img
        v-if="isClient"
        v-show="!loading"
        data-zoomable
        class="max-w-40 w-40 h-24 rounded-lg"
        :src="props.imgSrc"
        @load="onLoad"
      />
      <div v-show="loading" class="skeleton w-40 h-24 rounded-lg"></div>
    </figure>
    <div class="flex flex-col justify-between">
      <div class="mb-2">
        <h2 class="card-title text-base">{{ props.title }}</h2>
        <p class="text-gray-light dark:text-gray-dark">{{ props.description }}</p>
      </div>
      <div class="text-right">
        <a class="btn btn-sm font-normal" :href="props.href" target="_blank"> 查看详情 </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isClient } from '../../../utils/env/index'
import { useImageLoading } from '../../../utils/hooks/useImageLoading'
import type { ProjectCardProps } from '../types/index'

const props = defineProps<ProjectCardProps>()

const { loading, onLoad } = useImageLoading()
</script>

<style>
.project-item {
  border: 1px solid var(--vp-c-gutter);
}

.project-item:hover {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border: 1px solid transparent;
}
</style>
