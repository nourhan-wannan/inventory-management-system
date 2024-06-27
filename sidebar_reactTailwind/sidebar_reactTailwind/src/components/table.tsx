import React, { useState, useEffect } from "react";
import axiosInstance from "../Api/axios";

const Table = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("shipment/admin/");
        setOrders(response.data);
      } catch (error) {
        setError("Error fetching orders: " + error.message);
      }
    };

    fetchOrders();
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  const handleApprovalClick = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, approved: !order.approved } : order
      )
    );
  };

  const handleShippingClick = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, shipped: !order.shipped } : order
      )
    );
  };

  return (
    <div className="w-full p-7 scrollbar scrollbar-thumb-sky-400 scrollbar-track-sky-100">
      <h2 className="text-xl font-semibold rounded py-1 text-center text-white bg-indigo-600 my-5">
        ALL Orders
      </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-sm min-w-full overflow-x-scroll text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-indigo-600 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Approval
              </th>
              <th scope="col" className="px-6 py-3">
                Shipping
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4">{` ${order.product_name}`}</td>
                <td className="px-6 py-4">{order.quentity}</td>
                <td className="px-6 py-4">{currentDate.toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleApprovalClick(order.id)}
                    className={`flex items-center gap-1 my-5 rounded-lg ${
                      order.approved ? "bg-gray-500" : "bg-indigo-600"
                    } hover:translate-y-[-3px] shadow-lg duration-700 px-5 py-3 text-sm font-medium text-white`}
                  >
                    {order.approved ? "Approved" : "Approve"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleShippingClick(order.id)}
                    className={`flex items-center gap-1 my-5 rounded-lg ${
                      order.shipped ? "bg-gray-500" : "bg-green-600"
                    } hover:translate-y-[-3px] shadow-lg duration-700 px-5 py-3 text-sm font-medium text-white`}
                  >
                    {order.shipped ? "Done" : "Ship"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && (
          <div className="text-red-500 mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
