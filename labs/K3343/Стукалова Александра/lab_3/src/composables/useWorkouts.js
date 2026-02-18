import { ref } from 'vue'
import apiClient from './useApi'

export function useWorkouts() {
  const workouts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchWorkouts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/workouts')
      workouts.value = response.data
    } catch (err) {
      error.value = 'Ошибка загрузки тренировок'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    workouts,
    loading,
    error,
    fetchWorkouts
  }
}