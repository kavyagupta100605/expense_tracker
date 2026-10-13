import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
   <nav>
    <Link to="/">Home</Link>
    <span className="nav-dot"></span>
    <Link to="/summary">Summary</Link>
    <span className="nav-dot"></span>
    <Link to="/dashboard">Dashboard</Link>
   </nav>
  );
};

export default Navbar;
