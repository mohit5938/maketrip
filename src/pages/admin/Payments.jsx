import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CreditCard,
  Search,
  IndianRupee,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  X,
  Mail
} from "lucide-react";
import { getAdminPaymentsApi } from "../../services/adminService.js";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPayments, setTotalPayments] = useState(0);
  const [stats, setStats] = useState({
    totalPaidRevenue: 0,
    totalPaidCount: 0,
    totalPendingCount: 0,
    totalCancelledCount: 0,
  });

  useEffect(() => {
    fetchPayments();
  }, [page, search, statusFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await getAdminPaymentsApi(page, 10, search, statusFilter);
      if (res.success) {
        setPayments(res.payments || []);
        setTotalPayments(res.totalPayments || 0);
        if (res.stats) setStats(res.stats);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load payment logs.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner & Stats */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md mb-2">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Platform Financial Ledger
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Payments & Transaction Logs
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Monitor total settled revenues, pending checkout transactions, and traveler payment receipts.
            </p>
          </div>
        </div>

        {/* Finance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Settled Revenue</span>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
              ₹{stats.totalPaidRevenue.toLocaleString()}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Paid Transactions</span>
            <p className="text-xl sm:text-2xl font-black text-white mt-1">
              {stats.totalPaidCount}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Pending Payment</span>
            <p className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
              {stats.totalPendingCount}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Cancelled</span>
            <p className="text-xl sm:text-2xl font-black text-rose-400 mt-1">
              {stats.totalCancelledCount}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {[
            { id: "", label: "All Transactions" },
            { id: "paid", label: "Paid" },
            { id: "pending", label: "Pending" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setStatusFilter(tab.id);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transaction..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Payment Table */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-500">
          <Loader2 className="w-10 h-10 animate-spin text-purple-600 mb-3" />
          <p className="font-semibold text-sm">Loading transaction ledger...</p>
        </div>
      ) : payments.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-xs">
          <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">No Payments Recorded</h3>
          <p className="text-slate-500 text-sm mt-1">
            {search || statusFilter ? "No transactions match your search filter." : "No payment transactions recorded yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-4 px-6">Transaction Ref</th>
                  <th className="py-4 px-6">Traveler</th>
                  <th className="py-4 px-6">Trip Name</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Payment Status</th>
                  <th className="py-4 px-6">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {payments.map((p) => (
                  <tr key={p.booking_id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6">
                      <span className="font-mono text-xs font-bold text-purple-700">
                        TXN-{p.booking_id}-2026
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-slate-900">{p.traveler_name}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-400" /> {p.traveler_email}
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-800 font-semibold">
                      {p.trip_name}
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-black text-slate-900 text-base">
                        ₹{Number(p.amount || 0).toLocaleString()}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                          p.payment_status === "paid"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {p.payment_status === "paid" ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {p.payment_status || "Pending"}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-500">
                      {formatDate(p.joined_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
