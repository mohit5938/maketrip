import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  UserCheck,
  BookmarkCheck,
  Loader2,
  X
} from "lucide-react";
import { getAllUsersApi } from "../../services/adminService.js";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsersApi(page, 10, search);
      if (res.success) {
        setUsers(res.users || []);
        setTotalPages(res.totalPages || 1);
        setTotalUsers(res.totalUsers || 0);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load users.");
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
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">User Directory</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Registered Users ({totalUsers})
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage registered platform travelers, hosts, and administrator permissions.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
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

      {/* Users Table */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-500">
          <Loader2 className="w-10 h-10 animate-spin text-purple-600 mb-3" />
          <p className="font-semibold text-sm">Loading users directory...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-xs">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">No Users Found</h3>
          <p className="text-slate-500 text-sm mt-1">
            {search ? `No users match "${search}".` : "No registered users found."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Role / Host Status</th>
                  <th className="py-4 px-6">Bookings</th>
                  <th className="py-4 px-6">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            u.profile_image ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(u.full_name || "User")}&background=3b82f6&color=fff`
                          }
                          alt={u.full_name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{u.full_name || "N/A"}</p>
                          <span className="text-xs text-slate-400">ID: #{u.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="text-xs space-y-1">
                        <p className="flex items-center gap-1.5 text-slate-800 font-semibold">
                          <Mail className="w-3.5 h-3.5 text-slate-400" /> {u.email}
                        </p>
                        {u.phone && (
                          <p className="flex items-center gap-1.5 text-slate-500">
                            <Phone className="w-3.5 h-3.5 text-purple-500" /> {u.phone}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-600">
                      {u.city || u.country ? (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                          <span>{[u.city, u.country].filter(Boolean).join(", ")}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400">Not specified</span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-self-start px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                            u.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {u.role}
                        </span>

                        {u.host_status && (
                          <span
                            className={`inline-self-start px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              u.host_status === "APPROVED"
                                ? "bg-emerald-100 text-emerald-700"
                                : u.host_status === "PENDING"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            Host: {u.host_status}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-50 text-pink-600 text-xs font-bold rounded-full">
                        <BookmarkCheck className="w-3.5 h-3.5" /> {u.bookings_count} Trips
                      </span>
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-500">
                      {formatDate(u.created_at)}
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

export default User;
