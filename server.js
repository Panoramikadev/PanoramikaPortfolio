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

// Обработка GET-запроса по корневому пути
app.get('/', (req, res) => {
  res.send('Hello, this is the employee app!');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//LOGS
app.post('/api/employees', (req, res) => {
  const { image, position, name } = req.body;

  console.log('Received POST request with data:', { image, position, name });

  db.run('INSERT INTO employees (image, position, name) VALUES (?, ?, ?)', [image, position, name], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ success: true, message: 'Employee added successfully' });
  });
});

// Маршрут для очистки всей таблицы сотрудников
// curl -X DELETE http://localhost:3000/api/employees/clear
app.delete('/api/employees/clear', (req, res) => {
  db.run('DELETE FROM employees', function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ success: true, message: 'All employees deleted successfully' });
  });
});

// Маршрут для удаления сотрудника по ID
// curl -X DELETE http://localhost:3000/api/employees/1
app.delete('/api/employees/:id', (req, res) => {
  const idToDelete = req.params.id;

  db.run('DELETE FROM employees WHERE id = ?', [idToDelete], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (this.changes > 0) {
      res.json({ success: true, message: 'Employee deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Employee not found' });
    }
  });
});

// Маршрут для добавления нового сотрудника
app.post('/api/employees', (req, res) => {
  const { image, position, name } = req.body;

  db.run('INSERT INTO employees (image, position, name) VALUES (?, ?, ?)', [image, position, name], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ success: true, message: 'Employee added successfully' });
  });
});