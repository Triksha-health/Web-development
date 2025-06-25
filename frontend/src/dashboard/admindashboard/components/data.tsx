import { CheckCircle, XCircle, Clock, Truck, AlertCircle, Package, PackageCheck } from "lucide-react";

export interface PaymentTransaction {
  id: string;
  method: string;
  status: string;
  date: string;
  amount: string;
}

export interface DashboardData {
  dashboardStats: {
    totalPreOrders: number;
    newSignUpsToday: number;
    newSignUpsWeek: number;
    websiteTraffic: number;
    pendingOrders: number;
    confirmedOrders: number;
    totalRevenue: number;
  };
  allPreOrders: Array<{
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
  }>;
  users: Array<{
    id: string;
    name: string;
    email: string;
    registrationDate: string;
    preOrderStatus: string;
    orderId: string;
  }>;
}

export const getDashboardData = (): DashboardData => ({
  dashboardStats: {
    totalPreOrders: 1247,
    newSignUpsToday: 23,
    newSignUpsWeek: 156,
    websiteTraffic: 8542,
    pendingOrders: 89,
    confirmedOrders: 1158,
    totalRevenue: 2450000,
  },

  allPreOrders: [
    {
      id: "PO-001",
      customer: "John Doe",
      email: "john@example.com",
      product: "Premium Tier",
      date: "2025-06-22",
      amount: "₹2,499",
      paymentStatus: "Confirmed",
      shippingStatus: "Not Shipped",
      shippingAddress: "123 Main St, Mumbai, MH, 400001",
      paymentTransaction: {
        id: "TXN-1001",
        method: "UPI",
        status: "Success",
        date: "2025-06-22",
        amount: "₹2,499",
      },
    },
    {
      id: "PO-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      product: "Standard Tier",
      date: "2025-06-22",
      amount: "₹1,499",
      paymentStatus: "Pending",
      shippingStatus: "Not Shipped",
      shippingAddress: "456 Park Ave, Delhi, DL, 110001",
      paymentTransaction: {
        id: "TXN-1002",
        method: "Credit Card",
        status: "Pending",
        date: "2025-06-22",
        amount: "₹1,499",
      },
    },
    {
      id: "PO-003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      product: "Basic Tier",
      date: "2025-06-21",
      amount: "₹999",
      paymentStatus: "Confirmed",
      shippingStatus: "Shipped",
      shippingAddress: "789 Lake Rd, Bengaluru, KA, 560001",
      paymentTransaction: {
        id: "TXN-1003",
        method: "Net Banking",
        status: "Success",
        date: "2025-06-21",
        amount: "₹999",
      },
    },
    {
      id: "PO-004",
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      product: "Premium Tier",
      date: "2025-06-21",
      amount: "₹2,499",
      paymentStatus: "Confirmed",
      shippingStatus: "Shipped",
      shippingAddress: "321 Hill St, Pune, MH, 411001",
      paymentTransaction: {
        id: "TXN-1004",
        method: "UPI",
        status: "Success",
        date: "2025-06-21",
        amount: "₹2,499",
      },
    },
    {
      id: "PO-005",
      customer: "David Brown",
      email: "david@example.com",
      product: "Standard Tier",
      date: "2025-06-20",
      amount: "₹1,499",
      paymentStatus: "Confirmed",
      shippingStatus: "Delivered",
      shippingAddress: "654 River Rd, Chennai, TN, 600001",
      paymentTransaction: {
        id: "TXN-1005",
        method: "Debit Card",
        status: "Success",
        date: "2025-06-20",
        amount: "₹1,499",
      },
    },
    {
      id: "PO-006",
      customer: "Emily Davis",
      email: "emily@example.com",
      product: "Basic Tier",
      date: "2025-06-20",
      amount: "₹999",
      paymentStatus: "Confirmed",
      shippingStatus: "Not Shipped",
      shippingAddress: "987 Ocean Dr, Hyderabad, TS, 500001",
      paymentTransaction: {
        id: "TXN-1006",
        method: "UPI",
        status: "Success",
        date: "2025-06-20",
        amount: "₹999",
      },
    },
    {
      id: "PO-007",
      customer: "Chris Miller",
      email: "chris@example.com",
      product: "Premium Tier",
      date: "2025-06-19",
      amount: "₹2,499",
      paymentStatus: "Refunded",
      shippingStatus: "Not Shipped",
      shippingAddress: "246 Forest Ln, Kolkata, WB, 700001",
      paymentTransaction: {
        id: "TXN-1007",
        method: "Credit Card",
        status: "Refunded",
        date: "2025-06-19",
        amount: "₹2,499",
      },
    },
    {
      id: "PO-008",
      customer: "Lisa Anderson",
      email: "lisa@example.com",
      product: "Standard Tier",
      date: "2025-06-19",
      amount: "₹1,499",
      paymentStatus: "Pending",
      shippingStatus: "Not Shipped",
      shippingAddress: "135 Valley Rd, Ahmedabad, GJ, 380001",
      paymentTransaction: {
        id: "TXN-1008",
        method: "Net Banking",
        status: "Pending",
        date: "2025-06-19",
        amount: "₹1,499",
      },
    },
  ],
  users: [
    {
      id: "U-001",
      name: "John Doe",
      email: "john@example.com",
      registrationDate: "2025-06-20",
      preOrderStatus: "Yes",
      orderId: "PO-001",
    },
    {
      id: "U-002",
      name: "Jane Smith",
      email: "jane@example.com",
      registrationDate: "2025-06-21",
      preOrderStatus: "Yes",
      orderId: "PO-002",
    },
    {
      id: "U-003",
      name: "Bob Wilson",
      email: "bob@example.com",
      registrationDate: "2025-06-22",
      preOrderStatus: "No",
      orderId: "-",
    },
    {
      id: "U-004",
      name: "Alice Johnson",
      email: "alice@example.com",
      registrationDate: "2025-06-19",
      preOrderStatus: "Yes",
      orderId: "PO-005",
    },
  ],
});

export const getPaymentStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "text-green-600 bg-green-50";
    case "pending":
      return "text-yellow-600 bg-yellow-50";
    case "refunded":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

export const getShippingStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "text-green-600 bg-green-50";
    case "shipped":
      return "text-blue-600 bg-blue-50";
    case "not shipped":
      return "text-orange-600 bg-orange-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

export const getPaymentStatusIcon = (status: string): JSX.Element => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return <CheckCircle className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "refunded":
      return <XCircle className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};

export const getShippingStatusIcon = (status: string): JSX.Element => {
  switch (status.toLowerCase()) {
    case "delivered":
      return <PackageCheck className="w-4 h-4" />;
    case "shipped":
      return <Truck className="w-4 h-4" />;
    case "not shipped":
      return <Package className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};
