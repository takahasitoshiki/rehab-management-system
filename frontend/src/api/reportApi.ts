import axios from "axios";
import { Reservation } from "@/types/reservation";

const VITE_APP_REPORT_URL = import.meta.env.VITE_APP_REPORT_URL;


export const sendCompletedReservations = async (reservations: Reservation[]) => {
  return await axios.post(`${VITE_APP_REPORT_URL}`, {
    reservations,
  }, {
    headers: {
      Authorization: "Bearer dummy-token",
    }
  });
};