import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

export interface Show {
  id: string;
  name: string;
  start_time: string;
  total_seats: number;
  available_seats: number;
}

interface ShowContextType {
  shows: Show[];
  refreshShows: () => Promise<void>;
}

const ShowContext = createContext<ShowContextType>({
  shows: [],
  refreshShows: async () => {},
});

export const useShowContext = () => useContext(ShowContext);

export const ShowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shows, setShows] = useState<Show[]>([]);

  const fetchShows = async () => {
    try {
      const res = await api.get<Show[]>("/admin/shows");
      setShows(res.data);
    } catch (err) {
      console.error("Failed to fetch shows", err);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <ShowContext.Provider value={{ shows, refreshShows: fetchShows }}>
      {children}
    </ShowContext.Provider>
  );
};
