<template>
  <div class="container mt-4">
    <div v-if="!user" class="text-center">
      <h2>Войдите в аккаунт</h2>
      <p>Чтобы увидеть личный кабинет, нужно <router-link to="/login">войти</router-link></p>
    </div>

    <div v-else>
      <div class="row">
        <!-- Боковая панель с информацией пользователя -->
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body text-center">
              <img src="/images/avatar.jpg" alt="аватар пользователя" class="rounded-circle mb-3" width="150">
              <h4>{{ user.name }}</h4>
              <p class="text-muted">{{ user.email }}</p>
              <p class="text-muted">На платформе с февраля 2025</p>
              <button class="btn btn-outline-primary btn-sm">Редактировать профиль</button>
              <button @click="handleLogout" class="btn btn-outline-danger btn-sm mt-2">Выйти</button>
            </div>
          </div>

          <div class="card mb-4">
            <div class="card-header">
              <h5>Мои цели</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Снижение веса
                  <span class="badge bg-primary rounded-pill">5 кг</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Тренировок в неделю
                  <span class="badge bg-primary rounded-pill">3/5</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Воды в день
                  <span class="badge bg-primary rounded-pill">1.5/2л</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Основной контент -->
        <div class="col-md-8">
          <!-- Карточка прогресса -->
          <div class="card progress-card mb-4">
            <div class="card-body">
              <h5>Прогресс за неделю</h5>
              <div class="progress bg-white bg-opacity-25 mb-3" style="height: 25px;">
                <div class="progress-bar bg-warning" role="progressbar" style="width: 65%;">65%</div>
              </div>
              <p class="mb-0">Выполнено 5 из 8 тренировок на этой неделе</p>
            </div>
          </div>

          <!-- Статистика -->
          <div class="row mb-4">
            <div class="col-md-4">
              <div class="card stat-card">
                <div class="card-body">
                  <h6 class="text-muted">Всего тренировок</h6>
                  <h3>24</h3>
                  <small class="text-success">+3 за эту неделю</small>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card stat-card">
                <div class="card-body">
                  <h6 class="text-muted">Сожжено калорий</h6>
                  <h3>8,450</h3>
                  <small class="text-success">+1,200 за эту неделю</small>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card stat-card">
                <div class="card-body">
                  <h6 class="text-muted">Минут тренировок</h6>
                  <h3>1,245</h3>
                  <small class="text-success">+180 за эту неделю</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Планы тренировок -->
          <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Мои планы тренировок</h5>
              <button class="btn btn-primary btn-sm">+ Добавить план</button>
            </div>
            <div class="card-body">
              <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="mb-1">Утренняя йога</h6>
                    <small class="text-muted">Пн, Ср, Пт · 30 мин</small>
                  </div>
                  <span class="badge bg-success rounded-pill">Активно</span>
                </a>
                <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="mb-1">Силовая тренировка</h6>
                    <small class="text-muted">Вт, Чт · 45 мин</small>
                  </div>
                  <span class="badge bg-success rounded-pill">Активно</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'

const { user, logout } = useAuth()

const handleLogout = () => {
  logout()
  // Перенаправляем на главную
  window.location.href = '/'
}
</script>