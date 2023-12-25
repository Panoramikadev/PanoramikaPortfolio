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
      const nameElement = document.createElement('h2');
      nameElement.textContent = employee.name;
      nameElement.style.marginBottom = '0';
      nameElement.style.marginTop = '0';
      nameElement.style.fontSize = '18px';

      const positionElement = document.createElement('p');
      positionElement.textContent = employee.position;
      positionElement.style.marginTop = '7px';
      positionElement.style.marginBottom = '0';
      positionElement.style.color = "#383838";
      positionElement.style.fontWeight = "bold";
      positionElement.style.fontSize = '15px';

      

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