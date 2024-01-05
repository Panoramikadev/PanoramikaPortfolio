document.addEventListener('DOMContentLoaded', function () {
    fetchVideosAndDisplayList();
});

function fetchVideosAndDisplayList() {
    fetch('http://localhost:3000/api/videos')
        .then(response => response.json())
        .then(videos => {
            const videoList = document.getElementById('videoList');

            // Заполняем список видео
            videos.forEach(video => {
                const iframeSrc = `https://www.youtube.com/embed/${getVideoIdFromLink(video.video_link)}`;
                const videoBlock = document.createElement('div');
                videoBlock.innerHTML = `
                    <iframe width="560" height="315" src="${iframeSrc}" frameborder="0" allowfullscreen></iframe>
                `;
                videoList.appendChild(videoBlock);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Функция для получения идентификатора видео из ссылки YouTube
function getVideoIdFromLink(youtubeLink) {
    const match = youtubeLink.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
}