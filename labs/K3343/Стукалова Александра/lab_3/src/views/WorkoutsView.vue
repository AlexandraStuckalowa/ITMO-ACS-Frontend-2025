<template>
  <div class="container mt-4">
    <h1 class="mb-4">Поиск тренировок</h1>

    <!-- Фильтры (пока оставим как заглушку) -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card">
          <div class="card-header">
            <h5>Фильтры</h5>
          </div>
          <div class="card-body">
            <p class="text-muted">Фильтры временно не работают</p>
          </div>
        </div>
      </div>

      <!-- Список тренировок -->
      <div class="col-md-9">
        <!-- Сортировка -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <p class="mb-0">Найдено: <strong>{{ workouts.length }}</strong></p>
          <div class="d-flex align-items-center">
            <label class="me-2">Сортировать:</label>
            <select class="form-select" style="width: auto;">
              <option>По популярности</option>
              <option>По длительности</option>
            </select>
          </div>
        </div>

        <!-- Состояние загрузки -->
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Загрузка...</span>
          </div>
        </div>

        <!-- Ошибка -->
        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <!-- Список тренировок -->
        <div v-else class="row">
          <div v-for="workout in workouts" :key="workout.id" class="col-md-6 mb-4">
            <div class="card h-100">
              <img :src="`/images/${workout.image}`" class="card-img-top" :alt="workout.title">
              <div class="card-body">
                <h5 class="card-title">{{ workout.title }}</h5>
                <p class="card-text">{{ workout.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="badge bg-primary">{{ workout.type }}</span>
                  <span class="badge bg-success">{{ workout.level }}</span>
                  <span class="text-muted">{{ workout.duration }} мин</span>
                </div>
              </div>
              <div class="card-footer bg-white">
                <router-link :to="`/workout/${workout.id}`" class="btn btn-outline-primary w-100">
                  Смотреть
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWorkouts } from '../composables/useWorkouts'

const { workouts, loading, error, fetchWorkouts } = useWorkouts()

onMounted(() => {
  fetchWorkouts()
})
</script>