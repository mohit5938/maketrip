import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Compass,
  Heart,
  Save,
  Loader2,
  BookmarkCheck,
  ShieldCheck,
  LogOut,
  Sparkles
} from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { server } from "../constants/constant";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [stats, setStats] = useState({ trips: 0, confirmedTrips: 0, countries: 0 });

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    bio: "",
    travelStyle: "",
    favoriteDestination: "",
    role: "traveler"
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setFetching(true);
      const { data } = await axios.get(`${server}user/profile`, {
        withCredentials: true,
      });

      if (data.success && data.user) {
        setForm({
          full_name: data.user.full_name || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          city: data.user.city || "",
          country: data.user.country || "",
          bio: data.user.bio || "",
          travelStyle: data.user.travelStyle || "",
          favoriteDestination: data.user.favoriteDestination || "",
          role: data.user.role || "traveler"
        });
        if (data.user.profilePhoto) {
          setPreview(data.user.profilePhoto);
        }
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
      toast.error(error.response?.data?.message || "Failed to load profile details.");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      return toast.error("Image file size should be less than 10MB");
    }
    setProfilePhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("full_name", form.full_name);
      formData.append("phone", form.phone);
      formData.append("city", form.city);
      formData.append("country", form.country);
      formData.append("bio", form.bio);
      formData.append("travelStyle", form.travelStyle);
      formData.append("favoriteDestination", form.favoriteDestination);

      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      const { data } = await axios.put(`${server}user/profile`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message || "Profile Updated Successfully");
        if (data.user?.profilePhoto) {
          setPreview(data.user.profilePhoto);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${server}user/logout`, {}, { withCredentials: true });
      toast.success("Logged out successfully");
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
            <p className="text-sm font-medium">Loading profile details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200/80 overflow-hidden">
          
          {/* Cover Hero Banner */}
          <div className="h-44 sm:h-56 bg-gradient-to-r from-pink-600 via-rose-500 to-indigo-600 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-10 top-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Profile Header & Avatar */}
          <div className="relative px-6 sm:px-10 pb-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-20 sm:-mt-24 gap-4">
              
              {/* Avatar + Edit Camera */}
              <div className="relative group">
                <img
                  src={
                    preview ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(form.full_name || "Traveler")}&background=ec4899&color=fff`
                  }
                  alt={form.full_name}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-white shadow-xl bg-slate-100"
                />

                <label className="absolute bottom-2 right-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition transform border-2 border-white">
                  <Camera size={18} />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => navigate("/my-trips")}
                  className="px-4 py-2.5 bg-pink-50 hover:bg-pink-100 text-pink-600 text-xs sm:text-sm font-semibold rounded-xl border border-pink-200 transition flex items-center gap-2 cursor-pointer"
                >
                  <BookmarkCheck className="w-4 h-4" /> My Bookings
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/host/dashboard")}
                  className="px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs sm:text-sm font-semibold rounded-xl border border-purple-200 transition flex items-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" /> Host Dashboard
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs sm:text-sm font-semibold rounded-xl border border-rose-200 transition flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="mt-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {form.full_name || "Travel Explorer"}
                </h1>
                <span className="inline-self-center sm:self-auto px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-xs">
                  {form.role || "Traveler"}
                </span>
              </div>
              <p className="text-slate-500 text-sm mt-1 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> {form.email}
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50/50 border border-pink-100 rounded-2xl p-4 text-center">
                <h3 className="text-2xl sm:text-3xl font-black text-pink-600">
                  {stats.trips}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">Trips Booked</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50/50 border border-purple-100 rounded-2xl p-4 text-center">
                <h3 className="text-2xl sm:text-3xl font-black text-purple-600">
                  {stats.confirmedTrips}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">Confirmed</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100 rounded-2xl p-4 text-center">
                <h3 className="text-2xl sm:text-3xl font-black text-emerald-600">
                  {stats.countries}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">Countries</p>
              </div>
            </div>
          </div>

          {/* Profile Edit Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
            {/* Section 1: Personal Details */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-pink-500" /> Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Email Address (Read-only)
                  </label>
                  <input
                    type="email"
                    name="email"
                    disabled
                    value={form.email}
                    className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai, New Delhi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="e.g. India"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Travel Preferences */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-purple-500" /> Travel Preferences
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Travel Style
                  </label>
                  <select
                    name="travelStyle"
                    value={form.travelStyle}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition cursor-pointer"
                  >
                    <option value="">Select Travel Style</option>
                    <option value="Budget">Backpacker / Budget</option>
                    <option value="Mid Range">Comfort / Mid Range</option>
                    <option value="Luxury">Luxury & Resort</option>
                    <option value="Adventure">Solo & Trekking Adventure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Favorite Destination
                  </label>
                  <input
                    type="text"
                    name="favoriteDestination"
                    value={form.favoriteDestination}
                    onChange={handleChange}
                    placeholder="e.g. Bali, Manali, Kyoto"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Bio */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> Bio & Traveler Story
              </h3>

              <textarea
                rows="4"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Share a little bit about your travel story, favorite memories, or what drives your wanderlust..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white resize-none transition"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-6 border-t border-slate-100 flex justify-center sm:justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Profile Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
