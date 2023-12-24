document.addEventListener('DOMContentLoaded', function () {
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');

    nextButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            scrollToSection(button.getAttribute('data-next-section'));
        });
    });

    prevButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            scrollToPreviousSection(button);
        });
    });

    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function scrollToPreviousSection(button) {
        const currentSection = button.closest('section');
        const previousSection = currentSection.previousElementSibling;

        if (previousSection) {
            currentSection.classList.remove('show');
            previousSection.classList.add('show');
            previousSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
