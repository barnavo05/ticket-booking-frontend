import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useShowContext } from "../context/ShowContext";
import { api } from "../api";

const BookingPage: React.FC = () => {
  const { id } = useParams();
  const { shows, refreshShows } = useShowContext();
  const [seatCount, setSeatCount] = useState<number>(1);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState("");

  const show = shows.find((s) => s.id === id);

  const handleBook = async () => {
    if (!id) return;
    setError("");
    setStatus(null);

    try {
      const res = await api.post("/bookings", {
        showId: id,
        seatCount,
      });
      setStatus(res.data.status);
      await refreshShows();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  if (!show) {
    return <p>Show not found. Go back and refresh the list.</p>;
  }

  return (
    <div>
      <h2>Booking for {show.name}</h2>
      <p>
        Start: {new Date(show.start_time).toLocaleString()}
        <br />
        Available seats: {show.available_seats}/{show.total_seats}
      </p>

      <div>
        <label>Seats to book: </label>
        <input
          type="number"
          min={1}
          value={seatCount}
          onChange={(e) => setSeatCount(Number(e.target.value))}
        />
      </div>

      <button onClick={handleBook} style={{ marginTop: "0.5rem" }}>
        Confirm Booking
      </button>

      {status && <p>Booking Status: {status}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default BookingPage;
