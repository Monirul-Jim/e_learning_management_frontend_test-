import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    purchaseOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/payments/create-checkout-session/",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});
export const { usePurchaseOrderMutation } = paymentApi;
