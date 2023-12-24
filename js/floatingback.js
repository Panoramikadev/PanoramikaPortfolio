// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide the floating button based on scroll position
window.onscroll = function () {
    var scrollButton = document.querySelector('.floating-btn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 300) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
};