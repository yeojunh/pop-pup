import { useParams } from "react-router-dom";

export default function Recommendation() {
  const params = useParams();
  return <h2>Recommended: {params.id}</h2>;
}
