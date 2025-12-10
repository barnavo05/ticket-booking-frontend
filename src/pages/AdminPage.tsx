import React, { useState } from "react";
import { api } from "../api";
import { useShowContext } from "../context/ShowContext";

const AdminPage: React.FC = () => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [totalSeats, setTotalSeats] = useState<number>(40);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { shows, refreshShows } = useShowContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !startTime || !totalSeats) {
      setError("All fields are required");
      return;
    }

    try {
      const iso = new Date(startTime).toISOString();

      await api.post("/admin/show", {
        name,
        startTime: iso,
        totalSeats,
      });

      setSuccess("Show created successfully");
      setName("");
      setStartTime("");
      setTotalSeats(40);
      await refreshShows();
    } catch (err) {
      console.error(err);
      setError("Failed to create show");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <div>
          <label>Show/Bus Name: </label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Start Time: </label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label>Total Seats: </label>
          <input
            type="number"
            value={totalSeats}
            onChange={(e) => setTotalSeats(Number(e.target.value))}
          />
        </div>
        <button type="submit" style={{ marginTop: "0.5rem" }}>
          Create Show
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <h3>Existing Shows</h3>
      <ul>
        {shows.map((s) => (
          <li key={s.id}>
            {s.name} — {new Date(s.start_time).toLocaleString()} — Seats:{" "}
            {s.available_seats}/{s.total_seats}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
