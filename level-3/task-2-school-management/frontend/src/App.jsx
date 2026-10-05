import { Routes, Route } from "react-router-dom";
import { Students } from "./components/Students";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/students" element={<Students/>} />
      </Routes>
    </>
  );
}
