import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authslice';
import { apislice } from './slices/apislice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        [apislice.reducerPath] : apislice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apislice.middleware),
    devTools: true
});

export default store;
