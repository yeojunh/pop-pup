import { Link, Outlet } from "react-router-dom";
import { getCats } from "../utils/data";
import Navbar from "../components/ui/Navbar";

const Dogs = () => {
  const dogs = getCats();
  return (
    <div className="bg-garden-darkshade min-h-screen">
      <Navbar />
      <div className="flex">
        <h2>Dogs</h2>
        <nav className="border p-4">
          {dogs.map((dog) => (
            <Link className="block my-4" to={`/dogs/${dog.id}`} key={dog.id}>
              {dog.name}
            </Link>
          ))}
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default Dogs;
