import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.tsx";
import BookingPage from "./pages/BookingPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";

const App: React.FC = () => {
  return (
    <div style={{ padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">User View</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};

export default App;
