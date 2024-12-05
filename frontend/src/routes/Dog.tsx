import { useParams } from "react-router-dom";

export default function Dog() {
  const params = useParams();
  return <h2>Dog: {params.id}</h2>;
}
