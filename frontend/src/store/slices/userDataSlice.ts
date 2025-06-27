import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface OrderProgress {
  title: string;
  date: string;
  description: string;
  active: boolean;
  pulse?: boolean;
}

interface Order {
  orderId: string;
  date: string;
  status: string;
  product: string;
  price: string;
  originalPrice: string;
  savings: string;
  shipDate: string;
  deliveryDate: string;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
  progress: OrderProgress[];
}

interface UserDataState {
  value: Order | null;
}

const initialState: UserDataState = {
  value: null,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order>) => {
      state.value = action.payload;
    },
  },
});

export const { setOrder } = userDataSlice.actions;
export default userDataSlice.reducer;
