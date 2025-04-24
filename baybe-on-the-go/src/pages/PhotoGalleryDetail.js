import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function PhotoGalleryDetail() {
  const { albumId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const albumName = state?.name || 'Gallery';

  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    const formData = new FormData();
    Array.from(e.target.files).forEach((file) => {
      formData.append('files', file);
    });

    setIsUploading(true);

    try {
      await fetch(`http://localhost:4000/upload/${albumId}`, {
        method: 'POST',
        body: formData,
      });

      await loadImages(); // Refresh image list after upload
    } catch (err) {
      console.error("Upload failed", err);
    }

    setIsUploading(false);
  };

  const loadImages = async () => {
    try {
      const res = await fetch(`http://localhost:4000/images/${albumId}`);
      const data = await res.json();
      setImages(data.map((img) => ({
        id: uuidv4(),
        name: img.name,
        url: img.url,
      })));
    } catch (err) {
      console.error("Failed to load images", err);
    }
  };

  // Automatically load images when component mounts
  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
      <button
        onClick={() => navigate('/photo-gallery')}
        className="mb-6 text-blue-600 underline"
      >
        ← Back to albums
      </button>

      <h2 className="text-2xl font-bold mb-4">{albumName}</h2>

      <input type="file" multiple onChange={handleUpload} className="mb-6" />

      {isUploading && <p className="text-sm text-gray-500 mb-4">Uploading...</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id}>
            <img src={img.url} alt={img.name} className="rounded shadow" />
            <p className="text-sm mt-1 truncate">{img.name}</p>
          </div>
        ))}
      </div>

      <button
        onClick={loadImages}
        className="mt-8 text-sm text-blue-500 underline"
      >
        🔄 Refresh Gallery
      </button>
    </div>
  );
}
