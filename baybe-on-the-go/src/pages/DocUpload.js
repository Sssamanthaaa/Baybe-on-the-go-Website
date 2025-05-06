import { useRef, useState, React } from 'react';
import { ChevronDown, Paperclip, X } from 'lucide-react';
import ScanningOverlay from '../components/ScanningOverlay';
import { Upload } from 'lucide-react';

//variables here: catergories and set pr
const categories = [
  { title: 'Travel Insurance', priority: 'High' },
  { title: 'Medical Records', priority: 'High' },
  { title: 'Hotel Bookings', priority: 'Medium' },
  { title: 'Flight Tickets', priority: 'Medium' },
  { title: 'Passport Copies', priority: 'High' },
  { title: 'Activity Reservations', priority: 'Low' },
];

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800',
};

export default function DocUpload() {

  //intializing all function states ie.scan result is null in the beginging 
  const [result, setResult] = useState(null);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [docs, setDocs] = useState({});
  const [openCategory, setOpenCategory] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [preview, setPreview] = useState(null);

  const confirmAdd = () => {
    const filename = result.displayName || result.filename;
    const fileUrl = URL.createObjectURL(result.file);
    const messyReturn = result.category.toLowerCase();

    //clean up to match set variable
    const matchedCategory = categories.find(cat =>
      cat.title.toLowerCase().includes(messyReturn)
    )?.title;

    //maybe allow uses to set their own category??!!!!----------------------------------------------------------------------------------------
    if (!matchedCategory) {
      console.warn('Could not detect what kind of document this is.', result.category);
      setConfirmationPopUp(false);
      return;
    }

    setDocs(prev => {
      const updated = { ...prev };
      if (!updated[matchedCategory]) updated[matchedCategory] = [];
      updated[matchedCategory].push({ name: filename, url: fileUrl });
      return updated;
    });

    setConfirmationPopUp(false);
    setResult(null);

  };

  const toggleCategory = (title) => {
    setOpenCategory(prev => (prev === title ? null : title));
  };
  
  //removing document
  const removeDoc = (category, index) => {
    setDocs(prev => {
      const updated = { ...prev };
      updated[category] = [...updated[category]];
      updated[category].splice(index, 1);
      return updated;
    });
  };

  /* Noggin stuff */
  async function noggin(dataUrl) {
    const response = await fetch(
      'https://noggin.rea.gent/xenophobic-donkey-5091',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer rg_v1_lmms6vbqcx742h8aetyz8ui0l3eeab4l7ii3_ngk',
        },
        body: JSON.stringify({
          image: dataUrl,
        }),
      }
    );

    const text = await response.text();
    return { category: text.trim() };
  }
  
//what should be on the page aka the rendering on browser
  return (
    <div className="flex h-full">
      <main className="flex-1 bg-gray-50 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Document Categories</h1>

          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
              />
            </svg>
            Automatic Scan & Sort
          </button>
        </div>

        {/* Pop of confirmation type of file + file rename */}
        {confirmationPopUp && result && (
          <div className="flex justify-center items-start mb-8">
            <div className="bg-white p-6 rounded shadow border w-full max-w-md text-center">
              <h2 className="text-xl font-semibold mb-3">Scan Result</h2>
              <div className="mb-4 space-y-2">
              <p>Category: <strong>{result.category}</strong></p>
              <div className="flex flex-col items-start">
                <label className="text-sm text-gray-600 mb-1">Rename File:</label>
                <input
                  type="text"
                  value={result.displayName}
                  onChange={(e) =>
                    setResult((prev) => ({ ...prev, displayName: e.target.value }))
                  }
                  className="border rounded px-2 py-1 w-full"/>
              </div>
              </div>

              <button
                onClick={confirmAdd}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        )}

        {/* category of files boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="p-4 bg-white rounded-lg shadow flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-lg font-medium flex items-center gap-2">
                    {cat.title}
                  </h2>
                  <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[cat.priority]}`}>
                    {cat.priority} Priority
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 cursor-pointer transition-transform ${openCategory === cat.title ? 'rotate-180' : ''}`} 
                  onClick={() => toggleCategory(cat.title)}/>
              </div>

              {openCategory === cat.title && docs[cat.title] && docs[cat.title].length > 0 && (
                  <ul className="mt-2 ml-6 text-sm text-gray-700 list-disc">
                    {docs[cat.title].map((fileObj, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                        <a href={fileObj.url} target="_blank" rel="noopener noreferrer" download={fileObj.name} className="text-blue-600 hover:underline">
                          {fileObj.name}
                        </a>
                        <button onClick={() => setPreview(fileObj.url)} className="text-sm text-gray-500 underline hover:text-gray-700">
                          Quick View
                        </button>
                        <button onClick={() => removeDoc(cat.title, idx)} className="text-red-500 hover:text-red-700" >
                          <X className="w-4 h-4" />
                        </button>
                    </li>
                    
                    ))}

                  </ul>
              )}
            </div>
          ))}
        </div>

        <FileUploadDialog 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)}
          nogginFunc={noggin}
          setResult={setResult}
          setConfirmationPopUp={setConfirmationPopUp}
        />

        {preview && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full relative">
              <button
                onClick={() => setPreview(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto max-h-[80vh] object-contain rounded"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function FileUploadDialog({ isOpen, onClose, nogginFunc, setResult, setConfirmationPopUp }) {

  const [file, setFile] = useState(null);
  // preview is the data url
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
    
  const handleClose = () => {
    if (isUploading) return;
    setFile(null);
    setPreview(null);
    onClose();
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!preview) return;
    
    try {
      setIsUploading(true);      
      const { category } = await nogginFunc(preview);
      setResult({
        category: category,
        filename: file.name,
        file,
        displayName: file.name,
      });

      //use scan info to put into pop for confirmation from user
      setConfirmationPopUp(true);
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      
      {/* Dialog */}
      <div className="bg-white rounded-lg shadow-xl z-10 w-full max-w-2xl h mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="font-medium text-lg">Upload Image</h3>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="mb-4">
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
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {file.name}
              </p>
            )}
          </div>
          
          {/* Image Preview */}
          {preview && (
            <div className="mt-4">
              <p className="text-sm font-bold text-gray-700 mb-2">Preview:</p>
              <div className="bg-gray-100 p-2 rounded flex justify-center">
                {isUploading ? (
                  <ScanningOverlay>
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-h-64 max-w-full object-contain block"
                    />
                  </ScanningOverlay>
                ) : (
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-64 max-w-full object-contain block"
                  />
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
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
            disabled={!file || isUploading}
            className={`px-4 py-2 rounded text-white ${
              !file || isUploading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isUploading ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};