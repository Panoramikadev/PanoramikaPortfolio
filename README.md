# PanoramikaPortfolio

 веб-приложение с использованием сервера Express.js, базы данных SQLite и клиентской стороны на JavaScript. Давайте разберем основные компоненты и шаги, которые были предприняты.

1. Серверная часть (Node.js, Express.js, SQLite):
Подключение библиотек и создание сервера:
javascript
Copy code
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;
Подключение к базе данных SQLite и создание таблицы:
javascript
Copy code
const db = new sqlite3.Database('employees.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      position TEXT,
      name TEXT
    )
  `);
});
Middleware и обработка маршрутов:
javascript
Copy code
app.use(express.json());
app.use(cors());

// Маршрут для получения всех сотрудников
app.get('/api/employees', (req, res) => {
  // ...
});

// Маршрут для добавления нового сотрудника
app.post('/api/employees', (req, res) => {
  // ...
});

// Маршрут для удаления всех сотрудников
app.delete('/api/employees/clear', (req, res) => {
  // ...
});

// Маршрут для удаления сотрудника по ID
app.delete('/api/employees/:id', (req, res) => {
  // ...
});

// Логирование POST-запросов
app.post('/api/employees', (req, res) => {
  // ...
});

// Маршрут для корневого пути
app.get('/', (req, res) => {
  res.send('Hello, this is the employee app!');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
2. Фронтенд (JavaScript в браузере):
javascript
Copy code
const employeeContainer = document.getElementById('employee-container');

async function fetchEmployees() {
  try {
    const response = await fetch('http://localhost:3000/api/employees');
    const data = await response.json();

    data.forEach(employee => {
      const employeeElement = document.createElement('div');
      employeeElement.classList.add('employee', 'fade-in');

      const imgElement = document.createElement('img');
      imgElement.src = employee.image;
      imgElement.alt = employee.name;

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

      employeeElement.appendChild(imgElement);
      employeeElement.appendChild(nameElement);
      employeeElement.appendChild(positionElement);

      employeeContainer.appendChild(employeeElement);
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}

fetchEmployees();
Краткое описание шагов:
Настройка сервера:

Создание сервера Express.js.
Подключение к базе данных SQLite и создание таблицы.
Настройка middleware для обработки JSON и CORS.
Маршруты API:

GET /api/employees: Получение данных о сотрудниках из базы данных.
POST /api/employees: Добавление нового сотрудника в базу данных.
DELETE /api/employees/clear: Очистка таблицы сотрудников.
DELETE /api/employees/:id: Удаление сотрудника по ID.
Логирование:

Логирование POST-запросов для отслеживания изменений.
Фронтенд:

Получение данных с сервера API с использованием fetch.
Динамическое создание элементов для каждого сотрудника.
Применение стилей к элементам для красивого отображения.