import { cartReducer } from "./slices/cartSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
 persistStore,
 persistReducer,
 FLUSH,
 REHYDRATE,
 PAUSE,
 PERSIST,
 PURGE,
 REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
 key: "root",
 version: 1,
 storage,
 whitelist: ["cart"],
};

const rootReducer = combineReducers({
 cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
 reducer: {
  persistedReducer,
 },
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
   serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
   },
  }),
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof store.getState>;
