import { Link, Outlet } from "react-router-dom";
import "./tailwind.css";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/dogs">Dogs</Link> |{" "}
        <Link to="/cats">Cats</Link>  
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
