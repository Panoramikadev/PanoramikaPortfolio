// fadein.js

function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    return rect.top <= windowHeight;
}

function showOnScroll() {
    var elements = document.querySelectorAll('.fade-in');
    elements.forEach(function (element) {
        if (isInViewport(element)) {
            element.classList.add('show');
        }
    });
}

// Показываем элементы, которые находятся в видимой области при загрузке страницы
showOnScroll();

// Показываем элементы при прокрутке
window.addEventListener('scroll', showOnScroll);
