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