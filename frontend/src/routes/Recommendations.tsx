import { Link, Outlet } from "react-router-dom";
import { getCats } from "../utils/data";
import Navbar from "../components/ui/Navbar";

const Recomendations = () => {
  const recommendations = getCats();
  return (
    <div className="bg-garden-darkshade min-h-screen">
      <Navbar />
      <div className="flex">
        <h2>Cats</h2>
        <nav className="border-r p-4">
          {recommendations.map((recom) => (
            <Link className="block my-4" to={`/recommendations/${recom.id}`} key={recom.id}>
              {recom.name}
            </Link>
          ))}
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default Recomendations;