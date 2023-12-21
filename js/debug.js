document.addEventListener('DOMContentLoaded', function () {
    const video = document.querySelector('video');

    video.addEventListener('error', function () {
        console.error('Error loading the video:', video.error);
    });
});