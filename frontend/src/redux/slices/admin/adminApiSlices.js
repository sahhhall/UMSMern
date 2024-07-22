import { apislice } from "../apislice";

const ADMIN_URL = "/api/admin";

const adminApiSlice = apislice.injectEndpoints({
  endpoints: (builder) => ({
    authadmin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    fetchusers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/users`,
        method: "GET",
      }),
    }),
    deleteuser: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/users/${id}`,
        method: "DELETE",
      }),
    }),
    createuser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/users`,
        method: "POST",
        body: data
      })
    })
  }),
});

export const { useAuthadminMutation, useFetchusersQuery, useDeleteuserMutation, useCreateuserMutation } = adminApiSlice;
