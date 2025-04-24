import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PackingList from './pages/PackingList';
import DocUpload from './pages/DocUpload';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Gallery from './pages/Gallery';
import PhotoGalleryDetail from './pages/PhotoGalleryDetail';
import Dashboard from './pages/Dashboard';


const NotFound = () => (
  <div className="w-full text-center">
    <h1 className="text-4xl font-bold text-red-500">Error: Page Not Found</h1>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/packing-list" element={<PackingList />} />
              <Route path="/documentation" element={<DocUpload/>} />
              <Route path="/photo-gallery" element={<Gallery />} />
              <Route path="/photo-gallery/:albumId" element={<PhotoGalleryDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;