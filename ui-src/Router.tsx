import { MemoryRouter, Route, Routes } from "react-router-dom";
import ExtractSuccess from "./pages/ExtractSuccess";
import Home from "./pages/Home";
import IconExtract from "./pages/IconExtract";

export default function Router() {
  return (
    <MemoryRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="extract" element={<IconExtract />} />
        <Route path="extract_success" element={<ExtractSuccess />} />
      </Routes>
    </MemoryRouter>
  );
}
