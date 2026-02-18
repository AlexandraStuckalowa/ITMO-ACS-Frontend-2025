import { ref } from 'vue'
import apiClient from './useApi'

// Проверяем, есть ли сохранённый пользователь при загрузке
const savedUser = localStorage.getItem('user')
const user = ref(savedUser ? JSON.parse(savedUser) : null)

export function useAuth() {
  const loading = ref(false)
  const error = ref(null)

  const login = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get(`/users?email=${email}`)
      const users = response.data
      
      if (users.length === 0) {
        error.value = 'Пользователь с таким email не найден'
        return false
      } else if (users[0].password !== password) {
        error.value = 'Неверный пароль'
        return false
      } else {
        user.value = users[0]
        // Сохраняем пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(user.value))
        return true
      }
    } catch (err) {
      error.value = 'Ошибка сервера'
      console.error(err)
    } finally {
      loading.value = false
    }
    return false
  }

  const register = async (userData) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get(`/users?email=${userData.email}`)
      const users = response.data
      
      if (users.length > 0) {
        error.value = 'Пользователь с таким email уже существует'
        return false
      }
      
      const newUser = {
        id: Date.now(),
        ...userData
      }
      
      const createResponse = await apiClient.post('/users', newUser)
      user.value = createResponse.data
      // Сохраняем пользователя в localStorage
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    } catch (err) {
      error.value = 'Ошибка сервера'
      console.error(err)
    } finally {
      loading.value = false
    }
    return false
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  return {
    user,
    loading,
    error,
    login,
    register,
    logout
  }
}