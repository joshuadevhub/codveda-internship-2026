import { Routes, Route } from "react-router-dom";
import { Students } from "./components/Students";
import { Home } from "./components/Home";
import { DashboardLayout } from "./layouts/DashboardLayout";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="students" element={<Students />} />
        </Route>
      </Routes>
    </>
  );
}
