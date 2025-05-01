import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SimpleImageUploadDialog from '../components/SimpleImageUploadDialog';
import { Trash2 } from 'lucide-react';

export default function PhotoGalleryDetail() {
  const { albumId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const albumName = state?.name || 'Gallery';

  const [images, setImages] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const loadImages = useCallback(async () => {
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
  }, [albumId]);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('files', file);

    setIsUploading(true);
    try {
      const res = await fetch(`http://localhost:4000/upload/${albumId}`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      await loadImages();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageName) => {
    const confirmed = window.confirm(`Delete image "${imageName}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:4000/images/${albumId}/${imageName}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      setImages((prev) => prev.filter((img) => img.name !== imageName));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/photo-gallery')}
            className="text-blue-600 hover:underline"
          >
            ← Back to albums
          </button>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">{albumName}</h2>

        {isUploading && (
          <p className="text-sm text-gray-500 mb-4">Uploading...</p>
        )}

        {images.length === 0 ? (
          <p className="text-gray-500 italic">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative group rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition"
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-48 object-cover"
                />
                <p className="text-sm text-center p-2 truncate">{img.name}</p>

                <button
                  onClick={() => handleDelete(img.name)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-red-100 group-hover:opacity-100 opacity-0 transition"
                  title="Delete image"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Large Upload Button at Bottom */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            📤 Upload Photo
          </button>
        </div>

        <SimpleImageUploadDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onUpload={handleUpload}
        />
      </div>
    </div>
  );
}
