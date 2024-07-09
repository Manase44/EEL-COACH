import { create } from "zustand";

const doneSubmittingStore = create((set) => ({
  doneSubmitting: "",
  setDoneSubmitting: (option) =>
    set({
      doneSubmitting: option,
    }),
}));
export default doneSubmittingStore;
