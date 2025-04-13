import { Link } from "react-router-dom"

const Header = () => (
  <header className="h-12 flex items-center justify-center bg-blue-100">
    <nav className="text-center">
      <Link to="/" className="mr-4 text-blue-600 hover:text-blue-800 font-medium">Home</Link>
      <Link to="/packing-list" className="text-blue-600 hover:text-blue-800 font-medium">Packing List</Link>
    </nav>
  </header>
);


export default Header;