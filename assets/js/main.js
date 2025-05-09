document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelectorAll(".project");
    const savedTheme = localStorage.getItem("theme");
    const toggleBtn = document.querySelector(".toggle-theme-btn");

    if (savedTheme) {
        document.body.className = savedTheme;
        updateToggleButtonText(toggleBtn, savedTheme);
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            updateToggleButtonText(toggleBtn, 'light-mode');
        } else {
            updateToggleButtonText(toggleBtn, 'dark-mode');
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key.toLowerCase() === 't') {
            toggleTheme();
        }
    });

    projects.forEach((project, index) => {
        project.style.opacity = 0;
        setTimeout(() => {
            project.style.transition = "opacity 1s ease-in";
            project.style.opacity = 1;
        }, index * 300);
    });
});

function toggleTheme() {
    const body = document.body;
    const toggleBtn = document.querySelector(".toggle-theme-btn");
    toggleBtn.classList.add('theme-toggle-active');
    setTimeout(() => {
        toggleBtn.classList.remove('theme-toggle-active');
    }, 300);
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem("theme", "light-mode");
        updateToggleButtonText(toggleBtn, 'light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem("theme", "dark-mode");
        updateToggleButtonText(toggleBtn, 'dark-mode');
    }
}

function updateToggleButtonText(button, theme) {
    if (!button) return;
    
    if (theme === 'light-mode') {
        button.innerHTML = '<i class="theme-icon">🌙</i> Dark Mode';
    } else {
        button.innerHTML = '<i class="theme-icon">☀️</i> Light Mode';
    }
}
