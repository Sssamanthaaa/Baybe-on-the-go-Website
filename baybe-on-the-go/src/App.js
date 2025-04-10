import './App.css'; 

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-blue-400">
      <header className="text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Baybe On The Go!</h1>
        <p className="text-lg mb-4">
          Edit <code className="bg-white text-black px-2 py-1 rounded">src/App.js</code> and save to reload.
        </p>
        <a
          className="inline-block mt-4 text-blue-800 underline hover:text-white transition"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Here
        </a>
      </header>
    </div>
  );
}

export default App;
