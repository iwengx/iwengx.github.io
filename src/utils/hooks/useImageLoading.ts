import { ref } from 'vue'
import mediumZoom from 'medium-zoom'

interface ImageLoadingOptions {
  /**
   * 图片放大功能
   */
  mediumZoom?: {
    enable?: boolean
  }
}

type RemoveOptionalModifier<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined> extends object ? RemoveOptionalModifier<T[K]> : T[K]
}

type ImageLoadingMustOptions = RemoveOptionalModifier<ImageLoadingOptions>

const defaultOptions: ImageLoadingMustOptions = {
  mediumZoom: {
    enable: true,
  },
}

export const useImageLoading = (options?: ImageLoadingOptions) => {
  const internalOptions = { ...defaultOptions, ...options } as ImageLoadingMustOptions

  const loading = ref(true)

  const onLoad = (e: Event) => {
    loading.value = false

    if (internalOptions.mediumZoom.enable && e.target) {
      mediumZoom(e.target as HTMLImageElement, {
        background: 'var(--vp-c-bg)',
      })
    }
  }

  return {
    loading,
    onLoad,
  }
}
