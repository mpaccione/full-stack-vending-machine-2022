import { createSlice } from "@reduxjs/toolkit";
// import { mockSodas } from "../utils/mock";

const initialState = {
  allPromotions: null,
  currentPromotions: {},
  selectedId: null,
  sodas: null,
};

const sodaSlice = createSlice({
  name: "soda",
  initialState: initialState,
  reducers: {
    addPromo: (state, action) => {
      // admin - adding of promotion
      const promotionsCopy = JSON.parse(JSON.stringify(state.allPromotions))
      promotionsCopy.push(action.payload)
      promotionsCopy.sort((a, b) => Date(a.createdAt) - Date(b.createdAt))
      state.allPromotions = promotionsCopy

      const now = new Date()
      if (now > action.payload.startDate && now < action.payload.endDate) {
        state.currentPromotions[action.payload.productId] = action.payload
      }
    },
    deletePromo: (state, action) => {
      // admin - deletion of promotion - all and current
      const allIdx = state.allPromotions.findIndex(s => s.promotionId === action.payload)

      if (allIdx !== -1) {
        // all promotions is json array
        const allPromotionsCopy = JSON.parse(JSON.stringify(state.allPromotions))
        allPromotionsCopy.splice(allIdx, 1)
        state.allPromotions = allPromotionsCopy
      }
      
      if (Object.keys(state.currentPromotions).length > 0) {
        const currentPromotionObj = Object.values(state.currentPromotions).find(s => s.promotionId === action.payload)

        if (currentPromotionObj) {
          // current promotions are productId indexed key vals
          const currentPromotionsCopy = JSON.parse(JSON.stringify(state.currentPromotions))
          delete currentPromotionsCopy[currentPromotionObj.productId]
          state.currentPromotions = currentPromotionsCopy
        }
      }
    },
    deleteSoda: (state, action) => {
      // admin - deletion of product
      const idx = state.sodas.findIndex(s => s.productId === action.payload)
      if (idx !== -1) {
        const sodaCopy = JSON.parse(JSON.stringify(state.sodas))
        sodaCopy.splice(idx, 1)
        state.sodas = sodaCopy
      }
    },
    dispenseSoda: (state, action) => {
      // user - updates soda with new backend json (inventory)
      const idx = state.sodas.findIndex(s => s.productId === action.payload.productId)
      if (idx !== -1) {
        const sodaCopy = JSON.parse(JSON.stringify(state.sodas))
        sodaCopy[idx] = action.payload
        state.sodas = sodaCopy
      }
    },
    setAllPromotions: (state, action) => {
      // admin
      state.allPromotions = action.payload
    },
    setCurrentPromotions: (state, action) => {
      // user
      state.currentPromotions = action.payload
    },
    setSelectedId: (state, action) => {
      // user - out of stock - prevent selection
      if (state.sodas && state.sodas.find(s => s.productId === action.payload)?.currentInventory < 1) {
        state.selectedId = null;
      } else {
        state.selectedId = action.payload
      }
    },
    setSodas: (state, action) => {
      // admin + user
      state.sodas = action.payload
    },
  },
});

export const {
  addPromo,
  deletePromo,
  deleteSoda,
  dispenseSoda,
  setAllPromotions,
  setCurrentPromotions,
  setSelectedId,
  setSodas,
} = sodaSlice.actions;
export default sodaSlice.reducer;
