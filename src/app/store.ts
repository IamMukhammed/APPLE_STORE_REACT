import { configureStore, ThunkAction, Action, AnyAction } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import ProductsPageReducer from "./screens/productsPage/slice";
import reduxLogger from "redux-logger";
import OrdersPageReducer from "./screens/ordersPage/slice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    // @ts-ignore
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductsPageReducer,  // ✅ Add productsPage reducer here
    ordersPage: OrdersPageReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, 
  RootState, 
  unknown, 
  Action<string>
>;