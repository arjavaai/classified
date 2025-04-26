"use client";

import { useState } from "react";
import { Calendar, Filter, X, Download, CreditCard } from "lucide-react";
import Link from "next/link";

interface Payment {
  id: number;
  price: number;
  date: string;
  status: "Success" | "Failed" | "Pending";
}

interface DashboardPaymentHistoryProps {
  limit?: number;
  isOverview?: boolean;
}

export default function DashboardPaymentHistory({ limit, isOverview = false }: DashboardPaymentHistoryProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  
  // Mock payment data
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      price: 29.1,
      date: "January 17, 2025",
      status: "Success"
    },
    {
      id: 2,
      price: 997.5,
      date: "January 17, 2025",
      status: "Success"
    },
    {
      id: 3,
      price: 698.1,
      date: "January 17, 2025",
      status: "Success"
    },
    {
      id: 4,
      price: 1211.8,
      date: "January 15, 2025",
      status: "Success"
    }
  ]);

  const displayPayments = limit ? payments.slice(0, limit) : payments;

  return (
    <div className={isOverview ? "" : "space-y-6"}>
      {!isOverview && (
        <div className="flex justify-end mb-6">
          <div className="relative">
            <button 
              className={`${isFilterApplied ? 'btn btn-primary' : 'btn btn-secondary'} flex items-center`}
              onClick={() => setIsFilterActive(!isFilterActive)}
            >
              <Calendar className="h-5 w-5 mr-2" />
              <span>
                {isFilterApplied 
                  ? (startDate && endDate 
                    ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
                    : 'Filter Applied') 
                  : 'Date Range'}
              </span>
              {isFilterApplied && (
                <span 
                  className="ml-2 bg-white text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFilterApplied(false);
                    setStartDate("");
                    setEndDate("");
                  }}
                >
                  ×
                </span>
              )}
            </button>
            
            {isFilterActive && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10 border">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input 
                      type="date" 
                      className="border rounded-md px-2 py-1 text-sm"
                      placeholder="Start date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span className="text-gray-500">to</span>
                    <input 
                      type="date" 
                      className="border rounded-md px-2 py-1 text-sm"
                      placeholder="End date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <button 
                    className="btn btn-primary btn-sm w-full"
                    onClick={() => {
                      setIsFilterApplied(true);
                      setIsFilterActive(false);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={isOverview ? "overflow-x-auto" : "bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto"}>
        {displayPayments.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Act
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${payment.price}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === "Success" 
                        ? "bg-green-100 text-green-800" 
                        : payment.status === "Failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-gray-600 hover:text-primary transition">
                      <Download className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <CreditCard className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No payment history found</p>
          </div>
        )}

        {isOverview && displayPayments.length > 0 && (
          <div className="p-4 text-center border-t">
            <Link 
              href="/dashboard" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('[data-tab="payment"]')?.dispatchEvent(
                  new MouseEvent('click', { bubbles: true })
                );
              }}
              className="text-primary hover:text-primary/80 font-medium transition"
            >
              View Full Payment History
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
