function addEmployee() {
    const imageInput = document.getElementById('image');
    const position = document.getElementById('position').value;
    const name = document.getElementById('name').value;

    const imageFile = imageInput.files[0];
    if (!imageFile) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('position', position);
    formData.append('name', name);

    fetch('http://localhost:3000/api/employees', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      fetchAndDisplayEmployeesAdmin();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  function fetchAndDisplayEmployeesAdmin() {
    fetch('http://localhost:3000/api/employees')
      .then(response => response.json())
      .then(employees => {
        const employeeListAdmin = document.getElementById('employeeListAdmin');
        employeeListAdmin.innerHTML = '';

        employees.forEach(employee => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <strong>${employee.name}</strong> - ${employee.position}
            <button onclick="deleteEmployee(${employee.id})">Delete</button>
          `;
          employeeListAdmin.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  fetchAndDisplayEmployeesAdmin();

  function deleteEmployee(id) {
    fetch(`http://localhost:3000/api/employees/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      fetchAndDisplayEmployeesAdmin();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }


  // Функция для добавления видео
function addVideo() {
    const videoLinkInput = document.getElementById('video_link');
    const videoLink = videoLinkInput.value;
  
    // Отправляем запрос на сервер для добавления видео
    fetch('http://localhost:3000/api/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ video_link: videoLink }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
  
      // Очищаем поле ввода после успешного добавления
      videoLinkInput.value = '';
  
      // Обновляем список видео после добавления нового
      fetchAndDisplayVideosAdmin();
    })
    .catch(error => console.error('Error:', error));
  }
  
  // Функция для удаления видео
  function deleteVideo(videoId) {
    // Отправляем запрос на сервер для удаления видео
    fetch(`http://localhost:3000/api/videos/${videoId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
  
      // Обновляем список видео после удаления
      fetchAndDisplayVideosAdmin();
    })
    .catch(error => console.error('Error:', error));
  }
  
  // Функция для отображения списка видео в админке
  function fetchAndDisplayVideosAdmin() {
    // Отправляем запрос на сервер для получения списка видео
    fetch('http://localhost:3000/api/videos')
    .then(response => response.json())
    .then(videos => {
      const videoListAdmin = document.getElementById('videoListAdmin');
      videoListAdmin.innerHTML = '';
  
      // Отображаем каждое видео в списке
      videos.forEach(video => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <span>${video.video_link}</span>
          <button onclick="deleteVideo(${video.id})">Delete</button>
        `;
        videoListAdmin.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error:', error));
  }
  
  // Вызываем функцию при загрузке страницы для отображения списка видео
  fetchAndDisplayVideosAdmin();