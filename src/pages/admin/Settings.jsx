import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Settings as SettingsIcon,
  ShieldCheck,
  CreditCard,
  Bell,
  Save,
  Globe,
  Percent,
  Mail,
  UserCheck
} from "lucide-react";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    platformName: "JoinTrip Expedition Platform",
    supportEmail: "support@jointrip.com",
    commissionRate: "10",
    currency: "INR (₹)",
    autoApproveHosts: false,
    maxTripsPerHost: "15",
    enableUPI: true,
    enableCard: true,
    enableNetBanking: true,
    emailAlertNewHost: true,
    emailAlertBooking: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Platform settings saved successfully!");
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">System Administration</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Platform Settings & Configuration
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure system defaults, host moderation rules, payment gateways, and commission parameters.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: General Platform Configuration */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-600" /> General Platform Configuration
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Platform Name
              </label>
              <input
                type="text"
                name="platformName"
                value={form.platformName}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Support Email Address
              </label>
              <input
                type="email"
                name="supportEmail"
                value={form.supportEmail}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Platform Commission Fee (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="commissionRate"
                  value={form.commissionRate}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
                />
                <Percent className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Default Currency
              </label>
              <input
                type="text"
                name="currency"
                disabled
                value={form.currency}
                className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Host Moderation Rules */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-500" /> Host & Expedition Governance
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="font-bold text-slate-900 text-sm">Auto-Approve Host Applications</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automatically verify new host registration requests without manual admin review.
                </p>
              </div>
              <input
                type="checkbox"
                name="autoApproveHosts"
                checked={form.autoApproveHosts}
                onChange={handleChange}
                className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Max Active Expeditions Per Host
              </label>
              <input
                type="number"
                name="maxTripsPerHost"
                value={form.maxTripsPerHost}
                onChange={handleChange}
                className="w-full sm:w-64 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Payment Gateway Settings */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-500" /> Enabled Payment Gateways
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer">
              <input
                type="checkbox"
                name="enableUPI"
                checked={form.enableUPI}
                onChange={handleChange}
                className="w-5 h-5 accent-purple-600 rounded"
              />
              <div>
                <span className="font-bold text-slate-900 text-sm block">UPI (GPay / PhonePe)</span>
                <span className="text-xs text-slate-500">Instant QR Payments</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer">
              <input
                type="checkbox"
                name="enableCard"
                checked={form.enableCard}
                onChange={handleChange}
                className="w-5 h-5 accent-purple-600 rounded"
              />
              <div>
                <span className="font-bold text-slate-900 text-sm block">Cards (Visa/Mastercard)</span>
                <span className="text-xs text-slate-500">Debit & Credit Cards</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer">
              <input
                type="checkbox"
                name="enableNetBanking"
                checked={form.enableNetBanking}
                onChange={handleChange}
                className="w-5 h-5 accent-purple-600 rounded"
              />
              <div>
                <span className="font-bold text-slate-900 text-sm block">NetBanking</span>
                <span className="text-xs text-slate-500">Direct Bank Transfer</span>
              </div>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Platform Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
