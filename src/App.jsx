import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProgramDetail from "./pages/ProgramDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/program/:id" element={<ProgramDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
