import { ref } from 'vue'
import apiClient from './useApi'

export function useBlog() {
  const articles = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchArticles = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/blog')
      articles.value = response.data
    } catch (err) {
      error.value = 'Ошибка загрузки статей'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    articles,
    loading,
    error,
    fetchArticles
  }
}