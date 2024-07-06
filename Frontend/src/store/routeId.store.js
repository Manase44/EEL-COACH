import { create } from "zustand"

const choosenRouteStore = create((set) => {
    choosenRouteId:"",
    ChoosenRouteId: (passedId) => {
        set({
            choosenRouteId:passedId
        })
    }
})

export default choosenRouteStore;