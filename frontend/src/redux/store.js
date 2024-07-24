import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authslice';
import authAdminReducer from './slices/admin/adminAuthSlice'
import { apislice } from './slices/apislice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminauth: authAdminReducer,
        [apislice.reducerPath] : apislice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apislice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
