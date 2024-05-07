import { ref, onMounted } from 'vue'

export const useClient = () => {
  const isClient = ref(false)

  onMounted(() => {
    isClient.value = true
  })

  return {
    isClient,
  }
}
