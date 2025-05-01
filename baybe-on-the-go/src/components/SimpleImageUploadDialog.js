import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

export default function SimpleImageUploadDialog({ isOpen, onClose, onUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage || !onUpload) return;
    setIsUploading(true);
    try {
      await onUpload(selectedImage);
      handleClose();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (isUploading) return;
    setSelectedImage(null);
    setPreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose} />
      <div className="bg-white rounded-lg shadow-xl z-10 w-full max-w-2xl mx-4 overflow-hidden">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="font-medium text-lg">Upload Image</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <div className="p-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="w-full hover:bg-gray-100 text-gray-800 py-2 px-4 rounded flex flex-col items-center justify-center"
          >
            <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center p-4 mb-5">
              <Upload className="h-16 w-16 text-blue-500" />
            </div>
            <p className="font-medium">Upload a photo</p>
            <p className="text-gray-400">Click to select a file from your computer.</p>
          </button>

          {selectedImage && (
            <p className="mt-2 text-sm text-gray-600">Selected: {selectedImage.name}</p>
          )}

          {preview && (
            <div className="mt-4">
              <p className="text-sm font-bold text-gray-700 mb-2">Preview:</p>
              <div className="bg-gray-100 p-2 rounded flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-64 max-w-full object-contain"
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 flex justify-end space-x-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800"
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedImage || isUploading}
            className={`px-4 py-2 rounded text-white ${
              !selectedImage || isUploading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
