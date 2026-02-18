import { ref } from 'vue'
import apiClient from './useApi'

export function useWorkoutDetail() {
  const workout = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchWorkout = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get(`/workouts/${id}`)
      workout.value = response.data
    } catch (err) {
      error.value = 'Ошибка загрузки тренировки'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    workout,
    loading,
    error,
    fetchWorkout
  }
}