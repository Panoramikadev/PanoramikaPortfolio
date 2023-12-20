document.addEventListener('DOMContentLoaded', function () {
    const nextButtons = document.querySelectorAll('.next-btn');

    nextButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            scrollToNextSection(button.getAttribute('data-next-section'));
        });
    });

    function scrollToNextSection(sectionId) {
        const nextSection = document.getElementById(sectionId);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});