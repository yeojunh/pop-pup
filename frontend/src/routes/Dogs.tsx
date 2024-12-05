import { Link, Outlet } from "react-router-dom";
import { getCats } from "../utils/data";

const Dogs = () => {
  const dogs = getCats();
  return (
    <div className="flex">
      <h2>Dogs</h2>
      <nav className="border-r p-4">
        {dogs.map((dog) => (
          <Link className="block my-4" to={`/dogs/${dog.id}`} key={dog.id}>
            {dog.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}

export default Dogs;