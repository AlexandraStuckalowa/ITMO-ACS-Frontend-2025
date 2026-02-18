<template>
  <div class="container text-center mt-5">
    <h1>FitnessPlatform</h1>
    <p class="lead">Добро пожаловать на платформу здоровья и фитнеса!</p>
    
    <div class="d-flex flex-column gap-2 align-items-center mt-4">
      <router-link to="/login" class="btn btn-outline-primary w-25">Вход</router-link>
      <router-link to="/register" class="btn btn-outline-primary w-25">Регистрация</router-link>
      <router-link to="/profile" class="btn btn-outline-primary w-25">Личный кабинет</router-link>
      <router-link to="/workouts" class="btn btn-outline-primary w-25">Поиск тренировок</router-link>
      <router-link to="/blog" class="btn btn-outline-primary w-25">Блог</router-link>
    </div>
  </div>
</template>

<script setup>
</script>