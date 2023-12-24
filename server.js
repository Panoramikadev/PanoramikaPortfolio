const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3000;

// Подключение к базе данных SQLite и создание таблицы
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

// Используйте express.json() для обработки JSON-запросов
app.use(express.json());

// Включите CORS middleware
app.use(cors());

// Запрос на получение всех сотрудников
app.get('/api/employees', (req, res) => {
  db.all('SELECT * FROM employees', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

// Маршрут для добавления нового сотрудника
app.post('/api/employees', (req, res) => {
  // Ваш код обработки POST-запроса
});

// Обработка GET-запроса по корневому пути
app.get('/', (req, res) => {
  res.send('Hello, this is the employee app!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});