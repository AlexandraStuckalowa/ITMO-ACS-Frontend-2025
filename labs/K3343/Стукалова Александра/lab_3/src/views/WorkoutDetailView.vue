<template>
  <div class="container mt-4">
    <!-- Навигационная цепочка -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/workouts">Тренировки</router-link></li>
        <li class="breadcrumb-item active" v-if="workout">{{ workout.title }}</li>
      </ol>
    </nav>

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

    <!-- Данные тренировки -->
    <div v-else-if="workout" class="row">
      <div class="col-md-8">
        <!-- Картинка -->
        <div class="card mb-4">
          <img :src="`/images/${workout.image}`" class="card-img-top" :alt="workout.title">
          <div class="card-body">
            <h2 class="card-title">{{ workout.title }}</h2>
            <div class="d-flex gap-3 mb-3">
              <span class="badge bg-primary">{{ workout.type }}</span>
              <span class="badge bg-success">{{ workout.level }}</span>
              <span class="text-muted">⏱ {{ workout.duration }} мин</span>
            </div>
            <p class="card-text">{{ workout.description }}</p>
          </div>
        </div>

        <!-- Что понадобится -->
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="mb-0">Что понадобится</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Коврик для йоги</li>
              <li class="list-group-item">Удобная одежда</li>
              <li class="list-group-item">Бутылка воды</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Боковая панель -->
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="mb-0">Информация</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between">
                <span>Уровень:</span>
                <span class="badge bg-success">{{ workout.level }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Длительность:</span>
                <span>{{ workout.duration }} минут</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Калории:</span>
                <span>~{{ workout.calories }} ккал</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Тип:</span>
                <span>{{ workout.type }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Кнопка начала -->
        <div class="card mb-4">
          <div class="card-body text-center">
            <button class="btn btn-primary btn-lg w-100 mb-3">Начать тренировку</button>
            <button class="btn btn-outline-primary w-100">Добавить в план</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWorkoutDetail } from '../composables/useWorkoutDetail'

const route = useRoute()
const workoutId = ref(route.params.id)

const { workout, loading, error, fetchWorkout } = useWorkoutDetail()

onMounted(() => {
  fetchWorkout(workoutId.value)
})
</script>