// Переключение темной темы
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
    // Проверяем, есть ли сохраненная тема в localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }

    // Обработчик клика по кнопке
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Меняем иконку и сохраняем тему
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
}
