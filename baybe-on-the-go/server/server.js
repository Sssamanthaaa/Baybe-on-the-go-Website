// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.static('uploads'));

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const albumDir = path.join('uploads', req.params.albumId);
    fs.mkdirSync(albumDir, { recursive: true });
    cb(null, albumDir);
  },
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

// Upload endpoint
app.post('/upload/:albumId', upload.array('files'), (req, res) => {
  res.json({ message: 'Files uploaded successfully!' });
});

// List images
app.get('/images/:albumId', (req, res) => {
  const albumDir = path.join('uploads', req.params.albumId);
  if (!fs.existsSync(albumDir)) return res.json([]);
  const files = fs.readdirSync(albumDir).map(name => ({
    name,
    url: `http://localhost:${PORT}/${req.params.albumId}/${name}`,
  }));
  res.json(files);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
