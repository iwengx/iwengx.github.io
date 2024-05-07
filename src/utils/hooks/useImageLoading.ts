import { ref } from 'vue'

export const useImageLoading = () => {
  const loading = ref(true)

  const onLoad = () => {
    loading.value = false
  }

  return {
    loading,
    onLoad,
  }
}
