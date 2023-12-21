document.addEventListener('DOMContentLoaded', function () {
    const headerBtn = document.querySelectorAll('.home-btn, .portfolio-btn, .about-btn, .contacts-btn');

    headerBtn.forEach(function (button) {
        button.addEventListener('click', function () {
            scrollToSection(button.getAttribute('next-section'));
        });
    });

    function scrollToSection(sectionId) {
        const nextSection = document.getElementById(sectionId);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});