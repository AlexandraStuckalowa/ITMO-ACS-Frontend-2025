<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="text-center mb-4">Вход</h2>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  v-model="email"
                  placeholder="Введите email" 
                  required
                >
              </div>
              
              <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="password" 
                  v-model="password"
                  placeholder="Введите пароль" 
                  required
                >
              </div>
              
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="remember" v-model="remember">
                <label class="form-check-label" for="remember">Запомнить меня</label>
              </div>
              
              <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                {{ loading ? 'Вход...' : 'Войти' }}
              </button>
            </form>

            <!-- Сообщение об ошибке -->
            <div v-if="error" class="alert alert-danger mt-3">
              {{ error }}
            </div>

            <!-- Сообщение об успехе -->
            <div v-if="success" class="alert alert-success mt-3">
              Вход выполнен успешно!
            </div>

            <div class="text-center mt-3">
              <router-link to="/register">Нет аккаунта? Зарегистрироваться</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const email = ref('')
const password = ref('')
const remember = ref(false)
const success = ref(false)

const { loading, error, login } = useAuth()

const handleLogin = async () => {
  success.value = false
  const result = await login(email.value, password.value)
  if (result) {
    success.value = true
    email.value = ''
    password.value = ''
  }
}
</script>