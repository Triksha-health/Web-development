import { CheckCircle, XCircle, Clock, Truck, AlertCircle, LucideIcon } from "lucide-react";

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
  recentPreOrders: Array<{
    id: string;
    customer: string;
    email: string;
    product: string;
    date: string;
    amount: string;
    status: string;
    payment: string;
  }>;
  allPreOrders: Array<{
    id: string;
    customer: string;
    email: string;
    product: string;
    date: string;
    amount: string;
    status: string;
    payment: string;
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
  recentPreOrders: [
    {
      id: "PO-001",
      customer: "John Doe",
      email: "john@example.com",
      product: "Premium Tier",
      date: "2025-06-22",
      amount: "₹2,499",
      status: "Confirmed",
      payment: "Paid",
    },
    {
      id: "PO-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      product: "Standard Tier",
      date: "2025-06-22",
      amount: "₹1,499",
      status: "Pending",
      payment: "Pending",
    },
    {
      id: "PO-003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      product: "Basic Tier",
      date: "2025-06-21",
      amount: "₹999",
      status: "Confirmed",
      payment: "Paid",
    },
    {
      id: "PO-004",
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      product: "Premium Tier",
      date: "2025-06-21",
      amount: "₹2,499",
      status: "Shipped",
      payment: "Paid",
    },
  ],
  allPreOrders: [
    {
      id: "PO-001",
      customer: "John Doe",
      email: "john@example.com",
      product: "Premium Tier",
      date: "2025-06-22",
      amount: "₹2,499",
      status: "Confirmed",
      payment: "Paid",
    },
    {
      id: "PO-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      product: "Standard Tier",
      date: "2025-06-22",
      amount: "₹1,499",
      status: "Pending",
      payment: "Pending",
    },
    {
      id: "PO-003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      product: "Basic Tier",
      date: "2025-06-21",
      amount: "₹999",
      status: "Confirmed",
      payment: "Paid",
    },
    {
      id: "PO-004",
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      product: "Premium Tier",
      date: "2025-06-21",
      amount: "₹2,499",
      status: "Shipped",
      payment: "Paid",
    },
    {
      id: "PO-005",
      customer: "David Brown",
      email: "david@example.com",
      product: "Standard Tier",
      date: "2025-06-20",
      amount: "₹1,499",
      status: "Delivered",
      payment: "Paid",
    },
    {
      id: "PO-006",
      customer: "Emily Davis",
      email: "emily@example.com",
      product: "Basic Tier",
      date: "2025-06-20",
      amount: "₹999",
      status: "Confirmed",
      payment: "Paid",
    },
    {
      id: "PO-007",
      customer: "Chris Miller",
      email: "chris@example.com",
      product: "Premium Tier",
      date: "2025-06-19",
      amount: "₹2,499",
      status: "Refunded",
      payment: "Refunded",
    },
    {
      id: "PO-008",
      customer: "Lisa Anderson",
      email: "lisa@example.com",
      product: "Standard Tier",
      date: "2025-06-19",
      amount: "₹1,499",
      status: "Pending",
      payment: "Pending",
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

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "confirmed":
    case "paid":
    case "delivered":
      return "text-green-600 bg-green-50";
    case "pending":
      return "text-yellow-600 bg-yellow-50";
    case "shipped":
      return "text-blue-600 bg-blue-50";
    case "refunded":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

export const getStatusIcon = (status: string): JSX.Element => {
  switch (status.toLowerCase()) {
    case "confirmed":
    case "paid":
    case "delivered":
      return <CheckCircle className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "shipped":
      return <Truck className="w-4 h-4" />;
    case "refunded":
      return <XCircle className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};
