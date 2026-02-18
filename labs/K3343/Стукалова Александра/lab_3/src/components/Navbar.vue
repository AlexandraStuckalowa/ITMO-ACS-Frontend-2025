<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">
      <router-link class="navbar-brand" to="/">FitnessPlatform</router-link>
      <div class="navbar-nav ms-auto">
        <router-link class="nav-link" to="/">Главная</router-link>
        <router-link class="nav-link" to="/login">Вход</router-link>
        <router-link class="nav-link" to="/register">Регистрация</router-link>
        <router-link class="nav-link" to="/profile">Личный кабинет</router-link>
        <router-link class="nav-link" to="/workouts">Тренировки</router-link>
        <router-link class="nav-link" to="/blog">Блог</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
//  пока пусто
</script>

<style scoped>
</style>