const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;
const UPLOADS_DIR = path.join(__dirname, 'uploads');

app.use(cors());
app.use('/uploads', express.static(UPLOADS_DIR)); // ✅ Explicit static path
app.use(express.json()); // needed to parse JSON bodies

// Setup storage for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const albumDir = path.join(UPLOADS_DIR, req.params.albumId);
    fs.mkdirSync(albumDir, { recursive: true });
    cb(null, albumDir);
  },
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

// Upload endpoint
app.post('/upload/:albumId', upload.array('files'), (req, res) => {
  res.json({ message: 'Uploaded successfully!' });
});
app.post('/albums/:albumId/metadata', express.json(), (req, res) => {
  const { albumId } = req.params;
  const { name } = req.body;

  const albumPath = path.join(UPLOADS_DIR, albumId);
  if (!fs.existsSync(albumPath)) {
    return res.status(404).json({ error: 'Album not found' });
  }

  const metadataPath = path.join(albumPath, 'metadata.json');

  // Only write createdAt once
  let existingMetadata = {};
  if (fs.existsSync(metadataPath)) {
    try {
      existingMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    } catch (e) {}
  }

  const metadata = {
    name,
    createdAt: existingMetadata.createdAt || new Date().toISOString(),
  };

  fs.writeFileSync(metadataPath, JSON.stringify(metadata), 'utf-8');
  res.json({ message: 'Metadata saved' });
});



// Get all images in album
app.get('/images/:albumId', (req, res) => {
  const albumDir = path.join(UPLOADS_DIR, req.params.albumId);
  if (!fs.existsSync(albumDir)) return res.json([]);

  const files = fs.readdirSync(albumDir)
    .filter(name => name !== 'metadata.json' && !name.startsWith('.')); // ✅ filter out metadata.json

  const result = files.map(name => ({
    name,
    url: `http://localhost:${PORT}/uploads/${req.params.albumId}/${name}`,
  }));

  res.json(result);
});


app.get('/albums', (req, res) => {
  if (!fs.existsSync(UPLOADS_DIR)) return res.json([]);

  const albums = fs.readdirSync(UPLOADS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => {
      const albumId = dirent.name;
      const albumPath = path.join(UPLOADS_DIR, albumId);
      const metadataPath = path.join(albumPath, 'metadata.json');

      let albumName = albumId;
      let createdAt = fs.statSync(albumPath).mtime.toISOString(); // fallback

      if (fs.existsSync(metadataPath)) {
        try {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
          if (metadata.name) albumName = metadata.name;
          if (metadata.createdAt) createdAt = metadata.createdAt;
        } catch (err) {
          console.warn(`Failed to read metadata for ${albumId}`);
        }
      }

      const files = fs.readdirSync(albumPath)
        .filter(f => !f.startsWith('.') && f !== 'metadata.json');

      return {
        id: albumId,
        name: albumName,
        date: new Date(createdAt).toLocaleDateString(), // 👈 readable format
        items: files.length,
        preview: files[0]
          ? `http://localhost:${PORT}/uploads/${albumId}/${files[0]}`
          : null,
      };
    });

  res.json(albums);
});


app.delete('/uploads/:albumId', (req, res) => {
  const albumPath = path.join(__dirname, 'uploads', req.params.albumId);
  if (!fs.existsSync(albumPath)) {
    return res.status(404).json({ error: 'Album not found' });
  }

  fs.rm(albumPath, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error('Failed to delete album:', err);
      return res.status(500).json({ error: 'Failed to delete album' });
    }
    console.log(`Deleted album: ${req.params.albumId}`);
    res.json({ message: 'Album deleted' });
  });
});
app.delete('/images/:albumId/:imageName', (req, res) => {
  const { albumId, imageName } = req.params;
  const imagePath = path.join(__dirname, 'uploads', albumId, imageName);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: 'Image not found' });
  }

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error('Failed to delete image:', err);
      return res.status(500).json({ error: 'Failed to delete image' });
    }

    console.log(`Deleted image: ${imageName} from album ${albumId}`);
    res.json({ message: 'Image deleted' });
  });
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
