import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  UserCheck,
  Phone,
  Mail,
  MapPin,
  Globe,
  Award,
  CheckCircle2,
  XCircle,
  Loader2,
  FileText
} from "lucide-react";
import { getPendingHostsApi, updateHostStatusApi } from "../../services/adminService.js";

export const PendingHosts = () => {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchPendingHosts();
  }, []);

  const fetchPendingHosts = async () => {
    try {
      setLoading(true);
      const res = await getPendingHostsApi(1, 20);
      if (res.success) {
        setHosts(res.hosts || []);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load pending host applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (userId, status) => {
    try {
      setActionLoading(userId);
      const res = await updateHostStatusApi(userId, status);
      if (res.success) {
        toast.success(`Host application ${status.toLowerCase()} successfully.`);
        fetchPendingHosts();
      }
    } catch (error) {
      toast.error(error.message || "Failed to update host application status.");
    } finally {
      setActionLoading(null);
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
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Host Verification Program</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Pending Host Applications ({hosts.length})
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Review host applications, hosting experience, location, and bio before approving host permissions.
          </p>
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-500">
          <Loader2 className="w-10 h-10 animate-spin text-purple-600 mb-3" />
          <p className="font-semibold text-sm">Loading pending host applications...</p>
        </div>
      ) : hosts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-xs">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">All Host Applications Reviewed!</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
            There are currently no host applications waiting for admin approval.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {hosts.map((host) => (
            <div
              key={host.user_id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      host.profile_image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(host.full_name || "Host")}&background=8b5cf6&color=fff`
                    }
                    alt={host.full_name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-200 shrink-0"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{host.full_name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" /> {host.email}
                      <span>•</span>
                      <Phone className="w-3.5 h-3.5 text-purple-500" /> {host.phone || "N/A"}
                    </p>
                  </div>
                </div>

                <span className="px-3.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold uppercase">
                  Pending Verification
                </span>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-500 shrink-0" />
                  <div>
                    <span className="text-slate-400 block font-medium">City</span>
                    <span className="font-bold text-slate-800">{host.city || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-500 shrink-0" />
                  <div>
                    <span className="text-slate-400 block font-medium">Languages</span>
                    <span className="font-bold text-slate-800">{host.languages || "N/A"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-500 shrink-0" />
                  <div>
                    <span className="text-slate-400 block font-medium">Hosting Experience</span>
                    <span className="font-bold text-slate-800">{host.experience || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Bio & Motivation */}
              <div className="space-y-3 text-xs sm:text-sm">
                {host.bio && (
                  <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 text-slate-700">
                    <strong className="text-purple-700 block mb-1">Host Bio:</strong>
                    {host.bio}
                  </div>
                )}

                {host.reason && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700">
                    <strong className="text-slate-900 block mb-1">Reason for Applying:</strong>
                    {host.reason}
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Applied on {formatDate(host.created_at)}</span>

                <div className="flex items-center gap-3">
                  <button
                    disabled={actionLoading === host.user_id}
                    onClick={() => handleStatusUpdate(host.user_id, "REJECTED")}
                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold rounded-xl border border-rose-200 transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>

                  <button
                    disabled={actionLoading === host.user_id}
                    onClick={() => handleStatusUpdate(host.user_id, "APPROVED")}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {actionLoading === host.user_id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    Approve Host
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingHosts;