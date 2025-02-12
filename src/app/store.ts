// import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
// import HomePageReducer from "./screens/homePage/slice";
// import reduxLogger from "redux-logger";

// export const store = configureStore({
//   middleware: (getDefaultMiddleware) => 
//     // @ts-ignore
//     getDefaultMiddleware().concat(reduxLogger),
//   reducer: {
//     homePage: HomePageReducer,
//   },
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;


// import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import HomePageReducer from "./screens/homePage/slice";
// import ProductsPageReducer from "./screens/productsPage/slice";  // ✅ Import ProductsPageReducer
// import reduxLogger from "redux-logger";

// export const store = configureStore({
//   middleware: (getDefaultMiddleware) => 
//     getDefaultMiddleware().concat(reduxLogger),
//   reducer: {
//     homePage: HomePageReducer,
//     productsPage: ProductsPageReducer,  // ✅ Add productsPage reducer here
//   },
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;

import { configureStore } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import ProductsPageReducer from "./screens/productsPage/slice";
import reduxLogger from "redux-logger";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductsPageReducer,  // ✅ Add productsPage reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger as any), // ✅ Fix TypeScript issue
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;