import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getDashboardData } from "../../dashboard/admindashboard/components/data";

interface DashboardStats {
  totalPreOrders: number;
  newSignUpsToday: number;
  newSignUpsWeek: number;
  websiteTraffic: number;
  pendingOrders: number;
  confirmedOrders: number;
  totalRevenue: number;
}

interface PaymentTransaction {
  id: string;
  method: string;
  status: string;
  date: string;
  amount: string;
}

interface PreOrder {
  id: string;
  customer: string;
  email: string;
  product: string;
  date: string;
  amount: string;
  paymentStatus: string;
  shippingStatus: string;
  shippingAddress: string;
  paymentTransaction: PaymentTransaction;
}

interface User {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  preOrderStatus: string;
  orderId: string;
}
interface UserProfile {
  name: string;
  role: string; // e.g., "Triksha Admin User"
  memberSince: string; // e.g., "June 2025"
  isSuperAdmin: boolean;
  isVerified: boolean;

  contactInformation: {
    email: string;
    phoneNumber: string;
    dateOfBirth: string; // or Date if you plan to parse it
  };

  additionalDetails: {
    address: string;
    emergencyContact: string;
    accountStatus: "Verified & Active" | "Inactive" | string;
  };
}

interface adminDatastates {
  dashboardStats: DashboardStats;
  allPreOrders: PreOrder[];
  users: User[];
  userProfile: UserProfile;
}

// Define the initial state using that type
const initialState: adminDatastates = {
  dashboardStats: {
    totalPreOrders: getDashboardData().dashboardStats.totalPreOrders || 0,
    newSignUpsToday: getDashboardData().dashboardStats.newSignUpsToday || 0,
    newSignUpsWeek: getDashboardData().dashboardStats.newSignUpsWeek || 0,
    websiteTraffic: getDashboardData().dashboardStats.websiteTraffic || 0,
    pendingOrders: getDashboardData().dashboardStats.pendingOrders || 0,
    confirmedOrders: getDashboardData().dashboardStats.confirmedOrders || 0,
    totalRevenue: getDashboardData().dashboardStats.totalRevenue || 0,
  },
  allPreOrders: getDashboardData().allPreOrders || [],
  users: getDashboardData().users || [],
  userProfile: {
    name: "sanjeev",
    role: "Triksha Admin User",
    memberSince: "June 2025",
    isSuperAdmin: true,
    isVerified: true,
    contactInformation: {
      email: "sanjeev@gmail.com",
      phoneNumber: "+91 98765 43210",
      dateOfBirth: "May 15, 1990",
    },
    additionalDetails: {
      address: "123 Main St, Bangalore, Karnataka, India",
      emergencyContact: "+91 98765 43211",
      accountStatus: "Verified & Active",
    },
  },
};

export const adminDataSlice = createSlice({
  name: "adminDatastates",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setdasboardStats: (state, action: PayloadAction<DashboardStats>) => {
      state.dashboardStats = action.payload;
    },
    setallPreOrders: (state, action: PayloadAction<PreOrder[]>) => {
      state.allPreOrders = action.payload;
    },
    setusers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
    updatepaymentStatus: (state, action: PayloadAction<{ orderId: string; newStatus: string }>) => {
      const { orderId, newStatus } = action.payload;
      const order = state.allPreOrders.find((order) => order.id === orderId);
      if (order) {
        order.paymentTransaction.status = newStatus;
        order.paymentStatus = newStatus;
      }
    },
    updateshipStatus: (state, action: PayloadAction<{ orderId: string; newStatus: string }>) => {
      const { orderId, newStatus } = action.payload;
      const order = state.allPreOrders.find((order) => order.id === orderId);
      if (order) {
        order.shippingStatus = newStatus;
      }
    },
  },
});

export const { setdasboardStats, setallPreOrders, setusers, setUserProfile, updatepaymentStatus, updateshipStatus } =
  adminDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectadminDataStates = (state: { adminDatastates: adminDatastates }) => state.adminDatastates;

export default adminDataSlice.reducer;
