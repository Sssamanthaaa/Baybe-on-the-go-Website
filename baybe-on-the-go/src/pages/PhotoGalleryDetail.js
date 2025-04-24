import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export default function PhotoGalleryDetail() {
  const { albumId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const albumName = state?.name || 'Gallery';

  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);

    const uploaded = await Promise.all(
      files.map(async (file) => {
        const fileRef = ref(storage, `albums/${albumId}/${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        return { id: uuidv4(), url, name: file.name };
      })
    );

    setImages((prev) => [...prev, ...uploaded]);
    setIsUploading(false);
  };

  const loadImages = async () => {
    const listRef = ref(storage, `albums/${albumId}`);
    const all = await listAll(listRef);
    const fetched = await Promise.all(
      all.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { id: uuidv4(), name: itemRef.name, url };
      })
    );
    setImages(fetched);
  };

  // Optional: auto-load on mount
  // useEffect(() => {
  //   loadImages();
  // }, []);

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
        🔄 Load Images from Firebase
      </button>
    </div>
  );
}