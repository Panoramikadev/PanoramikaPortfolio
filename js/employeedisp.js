const employeeContainer = document.getElementById('employee-container');

async function fetchEmployees() {
  try {
    const response = await fetch('http://localhost:3000/api/employees');
    const data = await response.json();

    data.forEach(employee => {
      const employeeElement = document.createElement('div');
      employeeElement.classList.add('employee', 'fade-in');

      // Создаем изображение сотрудника
      const imgElement = document.createElement('img');
      imgElement.src = employee.image;
      imgElement.alt = employee.name;

      // Создаем заголовок и параграф для имени и должности сотрудника
      const nameElement = document.createElement('h3');
      nameElement.textContent = employee.name;

      const positionElement = document.createElement('p');
      positionElement.textContent = employee.position;

      // Добавляем элементы в контейнер сотрудников
      employeeElement.appendChild(imgElement);
      employeeElement.appendChild(nameElement);
      employeeElement.appendChild(positionElement);

      // Добавляем элемент сотрудника в контейнер
      employeeContainer.appendChild(employeeElement);
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}

fetchEmployees();