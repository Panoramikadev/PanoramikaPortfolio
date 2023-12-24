document.addEventListener('DOMContentLoaded', function () {
    const prevButtons = document.querySelectorAll('.prev-btn');

    prevButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            scrollToPrevSection(button.getAttribute('data-prev-section'));
        });
    });

    function scrollToPrevSection(sectionId) {
        const prevSection = document.getElementById(sectionId);
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});