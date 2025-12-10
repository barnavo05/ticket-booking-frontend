import React from "react";
import { useShowContext } from "../context/ShowContext";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { shows } = useShowContext();

  if (!shows.length) {
    return <p>No shows available. Ask admin to create one.</p>;
  }

  return (
    <div>
      <h2>Available Trips</h2>
      <ul>
        {shows.map((show) => (
          <li key={show.id} style={{ marginBottom: "0.75rem" }}>
            <strong>{show.name}</strong>
            <br />
            Start: {new Date(show.start_time).toLocaleString()}
            <br />
            Seats: {show.available_seats}/{show.total_seats}
            <br />
            <Link to={`/booking/${show.id}`}>Book</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
