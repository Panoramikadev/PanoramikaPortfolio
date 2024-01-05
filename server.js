const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Подключение к базе данных SQLite и создание таблицы для сотрудников
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

// Подключение к базе данных SQLite и создание таблицы для видео
const dbVideos = new sqlite3.Database('videos.db');

dbVideos.serialize(() => {
  dbVideos.run(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_link TEXT
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

// Маршрут для добавления нового сотрудника
app.post('/api/employees', upload.single('image'), (req, res) => {
  const { position, name } = req.body;
  const imagePath = req.file.path; // Путь к загруженному файлу

  db.run('INSERT INTO employees (image, position, name) VALUES (?, ?, ?)', [imagePath, position, name], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ success: true, message: 'Employee added successfully' });
  });
});

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

// Маршрут для удаления сотрудника по ID
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

// Маршрут для добавления нового видео
app.post('/api/videos', (req, res) => {
  const { video_link } = req.body;

  dbVideos.run('INSERT INTO videos (video_link) VALUES (?)', [video_link], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ success: true, message: 'Video added successfully' });
  });
});

// Маршрут для получения списка видео
app.get('/api/videos', (req, res) => {
  dbVideos.all('SELECT * FROM videos', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

// Маршрут для удаления видео по ID
app.delete('/api/videos/:id', (req, res) => {
  const idToDelete = req.params.id;

  dbVideos.run('DELETE FROM videos WHERE id = ?', [idToDelete], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (this.changes > 0) {
      res.json({ success: true, message: 'Video deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Video not found' });
    }
  });
});

// Маршрут для отдачи видеофайлов по запросу
app.get('/api/video/:id', (req, res) => {
  const videoId = req.params.id;

  dbVideos.get('SELECT video_link FROM videos WHERE id = ?', [videoId], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const videoUrl = row.video_link;
    res.status(200).send({ video_link: videoUrl });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
