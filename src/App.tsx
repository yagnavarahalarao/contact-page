import "./App.css";
import AppLayout from "./pages/Home/AppLayout";
import Contact from "./pages/Contact/Contact";
import CreateContact from "./pages/CreateContact/CreateContact";
import EditContact from "./pages/EditContact/EditContact";
import Navbar from "./pages/Home/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./NotFound";
import ChartsMaps from "./pages/Charts/ChartsMaps";

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/contact" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create-contact" element={<CreateContact />} />
          <Route path="/edit-contact" element={<EditContact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/charts" element={<ChartsMaps />} />
        </Routes>
      </AppLayout>
    </div>
  );
}

export default App;
