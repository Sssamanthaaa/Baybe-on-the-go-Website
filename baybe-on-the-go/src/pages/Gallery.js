import { useNavigate } from 'react-router-dom';
import { Plus, CalendarDays, Image as ImageIcon, FileText } from 'lucide-react';

export default function Gallery() {
  const navigate = useNavigate();

  const handleOpenAlbum = (albumId, name) => {
    navigate(`/photo-gallery/${albumId}`, { state: { name } });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Photo Gallery</h1>
          <p className="text-gray-500 text-sm">Organize your travel memories and important documents</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
            📁 New Album
          </button>
          <button className="bg-white border px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
            ⬆️ Upload
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm px-4 py-3 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <input
          type="text"
          placeholder="Search albums, photos, or documents..."
          className="flex-1 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        <div className="flex items-center gap-2">
          <button className="text-gray-500 text-sm hover:text-gray-700">🔍 Filter</button>
          <button className="text-gray-500 text-sm hover:text-gray-700">⇅ Sort</button>
          <button className="text-blue-600 bg-blue-100 px-2 py-1 rounded-md text-sm">▦</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create Album Card */}
        <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center hover:bg-blue-50 cursor-pointer">
          <div className="text-blue-400 mx-auto w-fit mb-2">
            <Plus />
          </div>
          <h3 className="font-medium text-gray-700">Create New Album</h3>
          <p className="text-sm text-gray-400">Organize your photos and documents</p>
        </div>

        {/* Album Card 1 */}
        <div
          className="bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-blue-50"
          onClick={() => handleOpenAlbum('album-1', 'San Diego 2025')}
        >
          <div className="h-24 bg-gray-100 rounded mb-3"></div>
          <h3 className="font-semibold text-gray-800">San Diego 2025</h3>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <CalendarDays className="w-4 h-4 mr-1" /> May 15 – May 22, 2025
          </div>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <ImageIcon className="w-4 h-4 mr-1" /> 24 items
          </div>
        </div>

        {/* Album Card 2 */}
        <div
          className="bg-blue-50 rounded-lg shadow p-4 cursor-pointer hover:bg-blue-100"
          onClick={() => handleOpenAlbum('album-2', 'Important Documents')}
        >
          <div className="flex justify-center items-center h-24">
            <FileText className="w-10 h-10 text-blue-300" />
          </div>
          <h3 className="font-semibold text-gray-800">Important Documents</h3>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <FileText className="w-4 h-4 mr-1" /> Last updated: 2 days ago
          </div>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <ImageIcon className="w-4 h-4 mr-1" /> 8 items
          </div>
        </div>
      </div>
    </div>
  );
}
