import { create } from "zustand";

const seatNumberStore = create((set) => ({
  seatNumber: "",
  setSeatNumber: (passedSeat) => {
    set({
      seatNumber: passedSeat,
    });
  },
}));

export default seatNumberStore;
