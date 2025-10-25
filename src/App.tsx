import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<Services />} />
      {/* Catch-all: send unknown paths to home (optional) */}
      <Route path="*" element={<Index />} />
    </Routes>
  );
}
