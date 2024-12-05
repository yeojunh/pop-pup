import { createRoot } from "react-dom/client";
import "./tailwind.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Dogs from "./routes/Dogs.tsx";
import Dog from "./routes/Dog.tsx";
import Cats from "./routes/Cats.tsx";
import Cat from "./routes/Cat.tsx";
import Home from "./routes/Home";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="dogs" element={<Dogs />}>
          <Route path=":id" element={<Dog />} />
        </Route>
        <Route path="cats" element={<Cats />}>
          <Route path=":id" element={<Cat />} />
        </Route>
        {/* <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);
