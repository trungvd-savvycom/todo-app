import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 5173;
const BASE = process.env.BASE || '/'

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const tasksFileName = 'tasks.json';
const tasksFilePath = path.join(__dirname, tasksFileName);

const app = express();

app.use(express.json());

app.get('/api/tasks', (req, res) => {
  fs.readFile(tasksFileName, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading tasks file.');
    }
    res.json(JSON.parse(data) || []);
  });
});

app.post('/api/tasks', (req, res) => {
  const newTask = req.body;
  fs.readFile(tasksFileName, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading tasks file.');
    }
    const tasks = JSON.parse(data);
    tasks.push(newTask);
    fs.writeFile(tasksFileName, JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error saving task.');
      }
      res.status(201).json(newTask);
    });
  });
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const updatedTask = req.body;
  fs.readFile(tasksFileName, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading tasks file.');
    }
    let tasks = JSON.parse(data);
    tasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
    fs.writeFile(tasksFileName, JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error updating task.');
      }
      res.json(updatedTask);
    });
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  fs.readFile(tasksFileName, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading tasks file.');
    }
    let tasks = JSON.parse(data);
    tasks = tasks.filter((task) => task.id !== taskId);
    fs.writeFile(tasksFileName, JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error deleting task.');
      }
      res.status(204).end();
    });
  });
});

if (!isProduction) {
  (async () => {
    const vite = await createViteServer({
      server: { middlewareMode: true },
    });
    app.use(vite.middlewares);
  })();
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
