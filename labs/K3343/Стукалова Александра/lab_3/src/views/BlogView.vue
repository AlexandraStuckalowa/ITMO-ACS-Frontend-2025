<template>
  <div class="container mt-4">
    <h1 class="mb-4">Блог о здоровье и питании</h1>

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

    <!-- Список статей -->
    <div v-else class="row">
      <div v-for="article in articles" :key="article.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <img :src="`/images/${article.image}`" class="card-img-top" :alt="article.title">
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text">{{ article.description || 'Читайте в нашем блоге' }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="badge bg-primary">{{ article.category }}</span>
              <small class="text-muted">{{ article.readingTime }} мин</small>
            </div>
          </div>
          <div class="card-footer bg-white">
            <button class="btn btn-outline-primary w-100">Читать</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBlog } from '../composables/useBlog'

const { articles, loading, error, fetchArticles } = useBlog()

onMounted(() => {
  fetchArticles()
})
</script>