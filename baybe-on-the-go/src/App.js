import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PackingList from './pages/PackingList';
import Header from './components/Header';

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
        
        <main className="flex-grow flex items-center justify-center text-blue-400 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packing-list" element={<PackingList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;