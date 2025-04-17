import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types/product";
import { Member } from "../../../lib/types/member";

export interface HomePageState {
  popularProducts: Product[];
  newProducts: Product[];
  topUsers: Member[];
  featuredProducts?: Product[];
  chosenProduct?: Product;
  seller?: Member;
}

const initialState: HomePageState = {
  popularProducts: [],
  newProducts: [],
  topUsers: [],
  featuredProducts: [],
  chosenProduct: undefined,
  seller: undefined,
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularProducts: (state, action) => {
      state.popularProducts = action.payload;
    },
    setNewProducts: (state, action) => {
      state.newProducts = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setSeller: (state, action) => {
      state.seller = action.payload;
    },
  },
});

export const {
  setPopularProducts,
  setNewProducts,
  setTopUsers,
  setChosenProduct,
  setSeller,
} = homePageSlice.actions;

export default homePageSlice.reducer;