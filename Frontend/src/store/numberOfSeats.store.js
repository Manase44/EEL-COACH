import { create } from "zustand";

const numberOfSeatsStore = create((set) => {
    numberOfSeats:"",
    setNumberOfSeats: (passedNumber) => {
        set({
            numberOfSeats: passedNumber
        })
    }
})

export default numberOfSeatsStore;