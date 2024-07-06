import { create } from "zustand";

const travellingDateStore = create((set) => {
    travellngDate:"",
    setTravellingDate: (passedDate) => {
        set({
            travellngDate:passedDate
        })
    }
})

export default travellingDateStore;