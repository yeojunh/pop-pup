import { createRoot } from "react-dom/client";
import "./tailwind.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pet from "./routes/Pet.tsx";
import Pets from "./routes/Pets.tsx";
import Home from "./routes/Home";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="dogs" element={<Pets petType="dog" />}/>
        <Route path="cats" element={<Pets petType="cat" />}/>
        <Route path="pets/:id" element={<Pet />}/>
        {/* <Route path="recommendations" element={<Recommendations />}>
          <Route path=":id" element={<Recommendation />} />
        </Route> */}
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
);
