const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Подключение к базе данных SQLite и создание таблицы
const db = new sqlite3.Database('employees.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      imagePath TEXT,
      position TEXT,
      name TEXT
    )
  `);
});

// Используйте express.json() для обработки JSON-запросов
app.use(express.json());

// Включите CORS middleware
app.use(cors());

// Указываем папку для хранения загруженных файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'employees');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// Замените текущий маршрут для добавления нового сотрудника на использование multer
app.post('/api/employees', upload.single('image'), (req, res) => {
  const { position, name } = req.body;
  const imagePath = req.file ? `employees/${req.file.filename}` : null; // Путь к загруженному файлу

  db.run('INSERT INTO employees (imagePath, position, name) VALUES (?, ?, ?)', [imagePath, position, name], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ success: true, message: 'Employee added successfully' });
  });
});

//...

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