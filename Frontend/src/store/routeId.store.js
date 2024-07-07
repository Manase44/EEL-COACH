import { create } from "zustand";

const chosenRouteStore = create((set) => ({
  chosenRouteId: "",
  setChosenRouteId: (passedId) =>
    set({
      chosenRouteId: passedId,
    }),
}));

export default chosenRouteStore;
