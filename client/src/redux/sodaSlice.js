import { createSlice } from "@reduxjs/toolkit";
// import { mockSodas } from "../utils/mock";

const initialState = {
  allPromotions: null,
  currentPromotions: null,
  selectedId: null,
  sodas: null,
};

const sodaSlice = createSlice({
  name: "soda",
  initialState: initialState,
  reducers: {
    addNewPromotion: (state, action) => {
      // admin - adding of promotion
      const promotionsCopy = JSON.parse(JSON.stringify(state.allPromotions))
      promotionsCopy.push(action.payload)
      promotionsCopy.sort((a, b) => Date(a.createdAt) - Date(b.createdAt))
      state.allPromotions = promotionsCopy
    },
    deletePromotion: (state, action) => {
      // admin - deletion of promotion - all and current
      const allIdx = state.allPromotions.findIndex(s => s.promotionId === action.payload)
      const currentIdx = state.currentPromotions.findIndex(s => s.promotionId === action.payload)

      if (allIdx !== -1) {
        const allPromotionsCopy = JSON.parse(JSON.stringify(state.allPromotions))
        allPromotionsCopy.splice(allIdx, 1)
        state.allPromotions = allPromotionsCopy
      }

      if (currentIdx !== -1) {
        const currentPromotionsCopy = JSON.parse(JSON.stringify(state.currentPromotions))
        currentPromotionsCopy.splice(currentIdx, 1)
        state.currentPromotions = currentPromotionsCopy
      }
    },
    deleteSoda: (state, action) => {
      // admin - deletion of product
      const idx = sodas.findIndex(s => s.productId === action.payload)
      if (idx !== -1) {
        const sodaCopy = JSON.parse(JSON.stringify(state.sodas))
        sodaCopy.splice(idx, 1)
        state.sodas = sodaCopy
      }
    },
    dispenseSoda: (state, action) => {
      // user - updates soda with new backend json (inventory)
      const idx = sodas.findIndex(s => s.productId === action.payload.productId)
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
  addNewPromotion,
  deletePromotion,
  deleteSoda,
  dispenseSoda,
  setAllPromotions,
  setCurrentPromotions,
  setSelectedId,
  setSodas,
} = sodaSlice.actions;
export default sodaSlice.reducer;
