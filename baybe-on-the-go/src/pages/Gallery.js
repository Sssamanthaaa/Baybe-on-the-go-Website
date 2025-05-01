import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Plus, CalendarDays, Image as ImageIcon, Trash2 } from 'lucide-react';

export default function Gallery() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch('http://localhost:4000/albums');
        const data = await res.json();
        setAlbums(data);
      } catch (err) {
        console.error('Failed to fetch albums:', err);
      }
    };
    fetchAlbums();
  }, []);

  const handleCreateAlbum = async () => {
    const name = prompt("Enter a name for your new album:");
    if (!name) return;

    const newId = `album-${Date.now()}`;
    const formData = new FormData();
    const blob = new Blob([], { type: 'image/png' });
    formData.append('files', blob, 'placeholder.png');

    try {
      await fetch(`http://localhost:4000/upload/${newId}`, {
        method: 'POST',
        body: formData,
      });

      await fetch(`http://localhost:4000/albums/${newId}/metadata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      navigate(`/photo-gallery/${newId}`, { state: { name } });
      setAlbums(prev => [
        ...prev,
        {
          id: newId,
          name,
          date: new Date().toLocaleDateString(),
          items: 1,
          preview: null,
        },
      ]);
    } catch (err) {
      console.error('Failed to create album:', err);
    }
  };

  const handleOpenAlbum = (albumId, name) => {
    navigate(`/photo-gallery/${albumId}`, { state: { name } });
  };

  const handleDeleteAlbum = async (albumId) => {
    const confirmed = window.confirm("Are you sure you want to delete this album?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:4000/uploads/${albumId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');

      setAlbums(prev => prev.filter(a => a.id !== albumId));
    } catch (err) {
      console.error('Failed to delete album:', err);
      alert('Could not delete album from server.');
    }
  };

  const sortedAlbums = [...albums].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    switch (sortOption) {
      case 'newest':
        return dateB - dateA;
      case 'oldest':
        return dateA - dateB;
      case 'az':
        return a.name.localeCompare(b.name);
      case 'za':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Photo Gallery</h1>
          <p className="text-gray-500 text-sm">
            Organize your travel memories and important documents
          </p>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
          onClick={handleCreateAlbum}
        >
          📁 New Album
        </button>
      </div>

      <div className="flex items-center justify-end mb-4">
        <label className="text-sm text-gray-600 mr-2">Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="newest">📅 Newest First</option>
          <option value="oldest">📅 Oldest First</option>
          <option value="az">🔤 A–Z</option>
          <option value="za">🔤 Z–A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center hover:bg-blue-50 cursor-pointer"
          onClick={handleCreateAlbum}
        >
          <div className="text-blue-400 mx-auto w-fit mb-2">
            <Plus />
          </div>
          <h3 className="font-medium text-gray-700">Create New Album</h3>
          <p className="text-sm text-gray-400">Organize your photos and documents</p>
        </div>

        {sortedAlbums.map((album) => (
          <div
            key={album.id}
            className="bg-white rounded-lg shadow p-4 relative group hover:bg-blue-50 transition"
          >
            <button
              onClick={() => handleDeleteAlbum(album.id)}
              className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-red-100 group-hover:opacity-100 opacity-0 transition"
              title="Delete album"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>

            <div onClick={() => handleOpenAlbum(album.id, album.name)} className="cursor-pointer">
              {album.preview ? (
                <img
                  src={album.preview}
                  alt="Preview"
                  className="h-24 w-full object-cover rounded mb-3"
                />
              ) : (
                <div className="h-24 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400 text-sm">
                  No image
                </div>
              )}
              <h3 className="font-semibold text-gray-800">{album.name}</h3>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <CalendarDays className="w-4 h-4 mr-1" /> {album.date}
              </div>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <ImageIcon className="w-4 h-4 mr-1" /> {album.items} item{album.items !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
