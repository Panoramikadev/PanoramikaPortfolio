// fadeinonload.js

function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    return rect.top <= windowHeight;
}

function showOnLoad() {
    var elements = document.querySelectorAll('.fadeinonload');
    elements.forEach(function (element) {
        if (isInViewport(element)) {
            element.classList.add('show');
        }
    });
}

// Показываем элементы при загрузке страницы
document.addEventListener('DOMContentLoaded', showOnLoad);