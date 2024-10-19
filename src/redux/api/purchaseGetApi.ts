import { baseApi } from "./baseApi";

const purchaseGetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersByEmail: builder.query({
      query: (email) => ({
        url: `/payments/orders/?email=${email}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetOrdersByEmailQuery } = purchaseGetApi;
