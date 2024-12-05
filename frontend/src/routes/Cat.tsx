import { useParams } from "react-router-dom";
import { getCat } from "../utils/data";

export default function Cat() {
  const params = useParams();
  const cat = getCat(params.id as string);
  return <h2>Cat: {cat?.id}</h2>;
}
