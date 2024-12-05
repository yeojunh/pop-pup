import { Link, Outlet } from "react-router-dom";
import { getCats } from "../utils/data";

const Cats = () => {
  const cats = getCats();
  return (
    <div className="flex">
      <h2>Cats</h2>
      <nav className="border-r p-4">
        {cats.map((cat) => (
          <Link className="block my-4" to={`/cats/${cat.id}`} key={cat.id}>
            {cat.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}

export default Cats;