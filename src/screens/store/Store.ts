import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import cartReducer from './cartSlice';
import favoritesReducer from './favoriteSlice'; // Import the favorites slice

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'favorites'], // Add 'favorites' to whitelist
};

const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer, // Add favorites reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/PAUSE',
          'persist/REGISTER',
        ],
        ignoredPaths: ['register'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>; // Updated to use rootReducer instead of store.getState
export type AppDispatch = typeof store.dispatch;
