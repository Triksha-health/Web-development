import React from 'react';
import {
  Package,
  Truck,
  CheckCircle,
  Info,
  Calendar,
  MapPin,
  CreditCard
} from 'lucide-react';

interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
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
}

const OrdersTab: React.FC = () => {
  const order: Order = {
    orderId: 'TRK-2025-001234',
    date: 'July 1, 2025',
    status: 'Processing',
    product: 'Triksha - Early Bird',
    price: '₹14,999',
    originalPrice: '₹17,999',
    savings: '₹3,000',
    shipDate: 'Expected to ship on August 1, 2025',
    deliveryDate: 'Expected delivery: August 5-7, 2025',
    paymentMethod: 'Visa ending in 4242',
    shippingAddress: {
      name: 'John Doe',
      line1: '123 Main Street',
      line2: 'Apartment 4B',
      city: 'Bangalore',
      state: 'Karnataka',
      postalCode: '560001',
      country: 'India'
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-1">Track your Triksha pre-order and delivery status</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-primary-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-lg font-semibold text-primary-800">{order.product}</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-primary-600">
                Order ID: {order.orderId} • Placed on {order.date}
              </div>
            </div>
            <div className="mt-3 sm:mt-0 text-right">
              <div className="text-2xl font-bold text-primary-800">{order.price}</div>
              <div className="text-sm text-primary-600">
                <span className="line-through">{order.originalPrice}</span>
                <span className="ml-2 text-green-600 font-medium">Save {order.savings}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Progress */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-6">Order Progress</h3>
          <div className="relative">
            <div className="absolute top-5 left-5 bottom-5 w-0.5 bg-gray-200"></div>
            <div className="space-y-8">

              {/* Steps */}
              {[
                {
                  icon: <CheckCircle className="w-5 h-5 text-white" />,
                  title: 'Order Placed',
                  date: 'July 1, 2025',
                  description: 'Your pre-order has been confirmed and payment processed successfully.',
                  active: true
                },
                {
                  icon: <CreditCard className="w-5 h-5 text-white" />,
                  title: 'Payment Confirmed',
                  date: 'July 1, 2025',
                  description: `Payment of ${order.price} has been successfully processed.`,
                  active: true
                },
                {
                  icon: <Package className="w-5 h-5 text-white" />,
                  title: 'In Production',
                  date: 'Current Status',
                  description: 'Your Triksha device is being manufactured and tested by our quality team.',
                  active: true,
                  pulse: true
                },
                {
                  icon: <Package className="w-5 h-5 text-white" />,
                  title: 'Ready to Ship',
                  date: 'August 1, 2025',
                  description: 'Device will be packaged and ready for shipment.',
                  active: false
                },
                {
                  icon: <Truck className="w-5 h-5 text-white" />,
                  title: 'Shipped',
                  date: 'August 1, 2025',
                  description: 'Your order is on its way to you.',
                  active: false
                },
                {
                  icon: <CheckCircle className="w-5 h-5 text-white" />,
                  title: 'Delivered',
                  date: 'August 5-7, 2025',
                  description: 'Your Triksha device has been delivered.',
                  active: false
                }
              ].map((step, index) => (
                <div key={index} className="relative flex items-start">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center z-10 shadow-md ${
                      step.active
                        ? step.pulse
                          ? 'bg-blue-500 animate-pulse'
                          : 'bg-primary-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`font-medium ${
                          step.active ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span
                        className={`text-sm ${
                          step.date === 'Current Status' ? 'text-blue-600 font-medium' : 'text-gray-500'
                        }`}
                      >
                        {step.date}
                      </span>
                    </div>
                    <p
                      className={`text-sm mt-1 ${
                        step.active ? 'text-gray-600' : 'text-gray-500'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Order Details</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Info */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Product Information</h4>
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://images.pexels.com/photos/4482890/pexels-photo-4482890.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Triksha Device"
                    className="w-16 h-16 object-contain rounded"
                  />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{order.product}</h5>
                  <p className="text-sm text-gray-600 mb-2">AI-Powered Health Wearable</p>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-primary-600">{order.price}</span>
                    <span className="text-sm text-gray-500 line-through">{order.originalPrice}</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-3">What's Included</h5>
                <ul className="text-sm text-gray-600 space-y-2">
                  {[
                    'Triksha health wearable device',
                    'Wireless charging dock',
                    'Quick start guide & user manual',
                    '12 months premium subscription',
                    'Premium health coaching session',
                    'Lifetime priority support'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-[#3691ff] mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Shipping & Payment */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Shipping & Payment</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-3">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                    <h5 className="font-medium text-gray-900">Shipping Address</h5>
                  </div>
                  <div className="text-sm text-gray-600 ml-7">
                    <div>{order.shippingAddress.name}</div>
                    <div>{order.shippingAddress.line1}</div>
                    {order.shippingAddress.line2 && <div>{order.shippingAddress.line2}</div>}
                    <div>
                      {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                      {order.shippingAddress.postalCode}
                    </div>
                    <div>{order.shippingAddress.country}</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-3">
                    <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                    <h5 className="font-medium text-gray-900">Payment Method</h5>
                  </div>
                  <div className="text-sm text-gray-600 ml-7">{order.paymentMethod}</div>
                </div>

                <div>
                  <div className="flex items-center mb-3">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    <h5 className="font-medium text-gray-900">Delivery Timeline</h5>
                  </div>
                  <div className="text-sm text-gray-600 ml-7 space-y-1">
                    <div>{order.shipDate}</div>
                    <div>{order.deliveryDate}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-blue-50 p-6">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Need Help?</h4>
              <p className="text-sm text-blue-700 mb-4">
                If you have any questions about your order or need to make changes, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:support@triksha.com"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Email Support
                </a>
                <a
                  href="tel:+918001234567"
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-200"
                >
                  Call +91 (800) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTab;
