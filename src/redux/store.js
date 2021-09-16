import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import dictsReducer from "./dictionaries";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage
};

const reducers = combineReducers({
  counter: counterReducer,
  mdicts: dictsReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer /*{
    counter: counterReducer,
    persist: persistedReducer
  },*/,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

//https://stackoverflow.com/questions/63761763/how-to-configure-redux-persist-with-redux-toolkit
