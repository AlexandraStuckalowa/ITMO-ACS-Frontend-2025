// Ожидание  загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    if (document.getElementById('workouts-container')) {
        loadWorkouts();
    }
    
    // Загрузка статей для блога
    if (document.getElementById('blog-container')) {
        loadBlog();
    }
    
    // Авторизация 
    if (document.getElementById('loginForm')) {
        setupLogin();
    }

    // Регистрация
if (document.getElementById('registerForm')) {
    setupRegister();
}

function setupRegister() {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем значения полей
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const messageDiv = document.getElementById('registerMessage');
        
        // Проверяем, что пароли совпадают
        if (password !== confirmPassword) {
            messageDiv.innerHTML = '<div class="alert alert-danger">Пароли не совпадают</div>';
            return;
        }
        
        // Проверяем, не занят ли email
        fetch(`http://localhost:3000/users?email=${email}`)
            .then(response => response.json())
            .then(users => {
                if (users.length > 0) {
                    messageDiv.innerHTML = '<div class="alert alert-danger">Пользователь с таким email уже существует</div>';
                } else {
                    // Создаем нового пользователя
                    const newUser = {
                        id: Date.now(),
                        name: firstName + ' ' + lastName,
                        email: email,
                        password: password
                    };
                    
                    fetch('http://localhost:3000/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                    })
                    .then(response => response.json())
                    .then(user => {
                        messageDiv.innerHTML = '<div class="alert alert-success">Регистрация успешна!</div>';
                        
                        const modal = new bootstrap.Modal(document.getElementById('successModal'));
                        if (document.getElementById('successModal')) {
                            modal.show();
                        }
                        
                        document.getElementById('registerForm').reset();
                    })
                    .catch(error => {
                        console.error('Ошибка:', error);
                        messageDiv.innerHTML = '<div class="alert alert-danger">Ошибка сервера</div>';
                    });
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                messageDiv.innerHTML = '<div class="alert alert-danger">Ошибка сервера</div>';
            });
    });
}
});

// Загрузка тренировок с сервера
function loadWorkouts() {
    fetch('http://localhost:3000/workouts')
        .then(response => response.json())
        .then(workouts => {
            displayWorkouts(workouts);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('workouts-container').innerHTML = `
                <div class="alert alert-danger">
                    Не удалось загрузить тренировки. Проверьте, запущен ли сервер.
                </div>
            `;
        });
}

// Отображение тренировок
function displayWorkouts(workouts) {
    const container = document.getElementById('workouts-container');
    
    if (workouts.length === 0) {
        container.innerHTML = '<p class="text-center">Тренировок пока нет</p>';
        return;
    }
    
    let html = '';
    workouts.forEach(workout => {
        html += `
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <img src="images/${workout.image}" class="card-img-top" alt="${workout.title}">
                    <div class="card-body">
                        <h5 class="card-title">${workout.title}</h5>
                        <p class="card-text">${workout.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-primary">${workout.type}</span>
                            <span class="badge bg-success">${workout.level}</span>
                            <span class="text-muted">${workout.duration} мин</span>
                        </div>
                    </div>
                    <div class="card-footer bg-white">
                        <a href="workout-detail.html?id=${workout.id}" class="btn btn-outline-primary w-100">Смотреть</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    const countElement = document.querySelector('.d-flex p strong');
    if (countElement) {
        countElement.textContent = workouts.length;
    }
}

// Загрузка статей для блога
function loadBlog() {
    fetch('http://localhost:3000/blog')
        .then(response => response.json())
        .then(articles => {
            displayBlog(articles);
        })
        .catch(error => {
            console.error('Ошибка загрузки блога:', error);
        });
}

// Отображение статей блога
function displayBlog(articles) {
    const container = document.getElementById('blog-container');
    if (!container) return;
    
    if (articles.length === 0) {
        container.innerHTML = '<p class="text-center">Статей пока нет</p>';
        return;
    }
    
    let html = '';
    articles.forEach(article => {
        html += `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="images/${article.image}" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description || 'Читайте в нашем блоге'}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-primary">${article.category}</span>
                            <small class="text-muted">${article.readingTime} мин</small>
                        </div>
                    </div>
                    <div class="card-footer bg-white">
                        <a href="#" class="btn btn-outline-primary w-100">Читать</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Функция для авторизации
function setupLogin() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Отменяем отправку формы
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const messageDiv = document.getElementById('loginMessage');
        
        // Ищем пользователя на сервере
        fetch(`http://localhost:3000/users?email=${email}`)
            .then(response => response.json())
            .then(users => {
                if (users.length === 0) {
                    // Пользователь не найден
                    messageDiv.innerHTML = '<div class="alert alert-danger">Пользователь с таким email не найден</div>';
                } else if (users[0].password !== password) {
                    // Неверный пароль
                    messageDiv.innerHTML = '<div class="alert alert-danger">Неверный пароль</div>';
                } else {
                    messageDiv.innerHTML = '<div class="alert alert-success">Вход выполнен успешно!</div>';
                    
                    const modal = new bootstrap.Modal(document.getElementById('welcomeModal'));
                    if (document.getElementById('welcomeModal')) {
                        modal.show();
                    }
                    
                    document.getElementById('loginForm').reset();
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                messageDiv.innerHTML = '<div class="alert alert-danger">Ошибка сервера</div>';
            });
    });

    
}