import axios from "axios";
import { Reservation } from "@/types/reservation";

export const sendCompletedReservations = async (reservations: Reservation[]) => {
  return await axios.post("http://localhost:8000/api/report", {
    reservations,
  }, {
    headers: {
      Authorization: "Bearer dummy-token",
    }
  });
};