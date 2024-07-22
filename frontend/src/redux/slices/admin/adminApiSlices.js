import { apislice } from "../apislice";

const ADMIN_URL = "/api/admin";

const adminApiSlice = apislice.injectEndpoints({
    endpoints: (builder) => ({
        authadmin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useAuthadminMutation } = adminApiSlice;
