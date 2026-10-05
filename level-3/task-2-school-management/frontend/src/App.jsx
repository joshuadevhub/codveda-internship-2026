import { Routes, Route } from "react-router-dom";
import { Students } from "./components/Students";
import { Home } from "./components/Home";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/students" element={<Students/>} />
      </Routes>
    </>
  );
}
