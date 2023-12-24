document.addEventListener('DOMContentLoaded', function () {
    const nextButtons = document.querySelectorAll('.next-btn');
    nextButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            scrollToSection(button.getAttribute('data-next-section'));
        });
    }); 
});
