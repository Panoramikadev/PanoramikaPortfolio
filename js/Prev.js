document.addEventListener('DOMContentLoaded', function () {
    const prevButtons = document.querySelectorAll('.prev-btn');

    prevButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            scrollToPrevSection(button.getAttribute('data-prev-section'));
        });
    });
});