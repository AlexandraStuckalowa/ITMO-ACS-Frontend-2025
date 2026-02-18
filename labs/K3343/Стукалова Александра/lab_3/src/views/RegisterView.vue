<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="text-center mb-4">Регистрация</h2>

            <form @submit.prevent="handleRegister">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName" class="form-label">Имя</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="firstName" 
                    v-model="firstName"
                    placeholder="Введите имя" 
                    required
                  >
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lastName" class="form-label">Фамилия</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="lastName" 
                    v-model="lastName"
                    placeholder="Введите фамилию" 
                    required
                  >
                </div>
              </div>

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
                  placeholder="Придумайте пароль" 
                  required
                >
              </div>

              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Подтверждение пароля</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="confirmPassword" 
                  v-model="confirmPassword"
                  placeholder="Повторите пароль" 
                  required
                >
              </div>

              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="agreement" v-model="agreement" required>
                <label class="form-check-label" for="agreement">
                  Я согласен с <a href="#">условиями использования</a>
                </label>
              </div>

              <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
              </button>
            </form>

            <!-- Сообщение об ошибке -->
            <div v-if="error" class="alert alert-danger mt-3">
              {{ error }}
            </div>

            <!-- Сообщение об успехе -->
            <div v-if="success" class="alert alert-success mt-3">
              Регистрация успешна! <router-link to="/login">Войти</router-link>
            </div>

            <!-- Ошибка совпадения паролей -->
            <div v-if="passwordMismatch" class="alert alert-danger mt-3">
              Пароли не совпадают
            </div>

            <div class="text-center mt-3">
              <router-link to="/login">Уже есть аккаунт? Войти</router-link>
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

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreement = ref(false)
const success = ref(false)
const passwordMismatch = ref(false)

const { loading, error, register } = useAuth()

const handleRegister = async () => {
  // Сбрасываем сообщения
  success.value = false
  passwordMismatch.value = false
  
  // Проверяем совпадение паролей
  if (password.value !== confirmPassword.value) {
    passwordMismatch.value = true
    return
  }
  
  const userData = {
    name: firstName.value + ' ' + lastName.value,
    email: email.value,
    password: password.value
  }
  
  const result = await register(userData)
  if (result) {
    success.value = true
    // Очищаем форму
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    agreement.value = false
  }
}
</script>