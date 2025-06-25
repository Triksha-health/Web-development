import React, { useState, useMemo } from "react";
import { Search, Filter, Download, Eye, Edit, RefreshCw, X } from "lucide-react";
import { getPaymentStatusColor, getPaymentStatusIcon, getShippingStatusColor, getShippingStatusIcon } from "./data";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { updatepaymentStatus, updateshipStatus } from "../../../store/slices/adminDataSlice";
import Fuse from "fuse.js";

interface PreOrdersContentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
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

const PreOrdersContent: React.FC<PreOrdersContentProps> = ({ searchTerm, setSearchTerm }) => {
  const dispatch = useAppDispatch();
  const allPreOrders = useAppSelector((state) => state.adminData.allPreOrders);

  const [selectedOrder, setSelectedOrder] = useState<PreOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openupdatestatus, setopenupdatestatus] = useState<boolean>(false);
  const [statusUpdated, setstatusUpdated] = useState<boolean>(false);
  const [paymentstatus, setpaymentstatus] = useState<"Confirmed" | "Pending" | "Refunded">(
    selectedOrder?.paymentStatus as "Confirmed" | "Pending" | "Refunded"
  );
  const [shippingstatus, setshippingstatus] = useState<"Shipped" | "Delivered" | "Not Shipped">(
    selectedOrder?.shippingStatus as "Shipped" | "Delivered" | "Not Shipped"
  );

  const fuse = useMemo(() => {
    return new Fuse(allPreOrders, {
      keys: ["id", "customer", "email"],
      threshold: 0.3,
    });
  }, [allPreOrders]);

  const filteredOrders = searchTerm ? fuse.search(searchTerm).map((result) => result.item) : allPreOrders;

  const openModal = (order: PreOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };
  const openupdate = (order: PreOrder) => {
    setstatusUpdated(false);
    setpaymentstatus(order.paymentStatus as "Confirmed" | "Pending" | "Refunded");
    setshippingstatus(order.shippingStatus as "Shipped" | "Delivered" | "Not Shipped");
    setSelectedOrder(order);
    setopenupdatestatus(true);
  };
  const closeupdate = () => {
    setSelectedOrder(null);
    setopenupdatestatus(false);
  };

  const handleupdatestatus = (order: PreOrder, paystatus: string, shipstatus: string) => {
    setstatusUpdated(true);
    const ID: string = order.id;
    dispatch(updatepaymentStatus({ orderId: ID, newStatus: paystatus }));
    dispatch(updateshipStatus({ orderId: ID, newStatus: shipstatus }));
  };
  return (
    <div className="">
      {/* Search and Filter Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Order ID, Customer Name, or Email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Pre-orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Pre-orders ({allPreOrders.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(searchTerm.length === 0 ? allPreOrders : filteredOrders).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {getPaymentStatusIcon(order.paymentStatus)}
                      <span className="ml-1">{order.paymentStatus}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getShippingStatusColor(
                        order.shippingStatus
                      )}`}
                    >
                      {getShippingStatusIcon(order.shippingStatus)}
                      <span className="ml-1">{order.shippingStatus}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => openModal(order)} className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => openupdate(order)} className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p>
              <strong>Customer:</strong> {selectedOrder.customer}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.email}
            </p>
            <p>
              <strong>Shipping Address:</strong> {selectedOrder.shippingAddress}
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Payment Details</h3>
            <p>
              <strong>Transaction ID:</strong> {selectedOrder.paymentTransaction.id}
            </p>
            <p>
              <strong>Method:</strong> {selectedOrder.paymentTransaction.method}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.paymentTransaction.status}
            </p>
            <p>
              <strong>Date:</strong> {selectedOrder.paymentTransaction.date}
            </p>
            <p>
              <strong>Amount:</strong> {selectedOrder.paymentTransaction.amount}
            </p>

            <div className="mt-6 text-right">
              <button onClick={closeModal} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Update Payment and Shipping Status */}
      {openupdatestatus && selectedOrder && (
        <div className=" fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center mt-0">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
            <button onClick={closeupdate} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Client details</h2>
            <p>
              <strong>Customer:</strong> {selectedOrder.customer}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.email}
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Current Details</h3>
            <p>
              <strong>Transaction ID:</strong> {selectedOrder.paymentTransaction.id}
            </p>
            <p>
              <strong>Method:</strong> {selectedOrder.paymentTransaction.method}
            </p>
            <p>
              <strong>Curernt Payment Status:</strong> {selectedOrder.paymentTransaction.status}
            </p>
            <p>
              <strong>Curernt Shipping Status:</strong> {selectedOrder.shippingStatus}
            </p>
            <p>
              <strong>Date:</strong> {selectedOrder.paymentTransaction.date}
            </p>
            <p>
              <strong>Amount:</strong> {selectedOrder.paymentTransaction.amount}
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2">Update status</h3>
            <p>
              <strong>Set Payment Status:</strong>
              <button
                className={`ml-2 px-3 py-1 rounded transition-colors ${
                  paymentstatus === "Pending"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setpaymentstatus("Pending")}
                type="button"
              >
                Pending
              </button>
              <button
                className={`ml-2 px-3 py-1 rounded transition-colors ${
                  paymentstatus === "Confirmed"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setpaymentstatus("Confirmed")}
                type="button"
              >
                Confirmed
              </button>
              <button
                className={`ml-2 px-3 py-1 rounded transition-colors ${
                  paymentstatus === "Refunded"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setpaymentstatus("Refunded")}
                type="button"
              >
                Refunded
              </button>
            </p>
            <p>
              <strong>Set Shipping Status:</strong>
              <button
                className={`ml-2 px-3 py-1 rounded transition-colors ${
                  shippingstatus === "Shipped"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setshippingstatus("Shipped")}
                type="button"
              >
                Shipped
              </button>
              <button
                className={`ml-2 px-3 py-1 rounded transition-colors ${
                  shippingstatus === "Not Shipped"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setshippingstatus("Not Shipped")}
                type="button"
              >
                Not Shipped
              </button>
              <button
                className={`ml-2 px-3 py-1 rounded transition-colors ${
                  shippingstatus === "Delivered"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setshippingstatus("Delivered")}
                type="button"
              >
                Delivered
              </button>
            </p>
            <div className="flex justify-end mt-6 gap-2 text-right">
              <button
                disabled={statusUpdated}
                onClick={() => handleupdatestatus(selectedOrder, paymentstatus, shippingstatus)}
                className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                  statusUpdated ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Update
              </button>
              <button onClick={closeupdate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreOrdersContent;
