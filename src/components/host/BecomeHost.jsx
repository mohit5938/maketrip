import {
    Map,
    Wallet,
    Users,
    Compass,
    ArrowRight,
    ArrowLeft,
    Clock,
    Loader2
} from "lucide-react";
import { server } from "../../constants/constant.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar.jsx";

const benefits = [
    {
        icon: Wallet,
        title: "Earn Extra Income",
        description:
            "Host amazing trips and earn money while doing what you love.",
    },
    {
        icon: Users,
        title: "Build a Community",
        description:
            "Meet travelers from around the world and grow your network.",
    },
    {
        icon: Compass,
        title: "Share Your Passion",
        description:
            "Show hidden gems and unforgettable experiences to explorers.",
    },
];

const BecomeHost = () => {
    const [pageLoading, setPageLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [hostStatus, setHostStatus] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone: "",
        experience: "",
        city: "",
        languages: "",
        bio: "",
        reason: "",
        agree: false,
    });

    const getStatus = async () => {
        try {
            const { data } = await axios.get(
                `${server}hosts/status`,
                { withCredentials: true }
            );
            setHostStatus(data);
        } catch (error) {
            console.log(error);
        } finally {
            setPageLoading(false);
        }
    };

    useEffect(() => {
        getStatus();
    }, []);

    useEffect(() => {
        if (hostStatus?.status === "REJECTED") {
            toast.info(
                "Your previous application was rejected. You may submit a new application."
            );
        }
    }, [hostStatus]);

    useEffect(() => {
        if (hostStatus?.status === "APPROVED") {
            navigate("/host/dashboard");
        }
    }, [hostStatus, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.agree) {
            return toast.error("Please accept Terms & Conditions.");
        }

        try {
            setSubmitting(true);

            const { data } = await axios.post(
                `${server}hosts/apply`,
                {
                    phone: formData.phone,
                    experience: formData.experience,
                    city: formData.city,
                    languages: formData.languages,
                    bio: formData.bio,
                    reason: formData.reason,
                },
                { withCredentials: true }
            );

            if (data.success) {
                toast.success(data.message);
                await getStatus();
                setFormData({
                    phone: "",
                    experience: "",
                    city: "",
                    languages: "",
                    bio: "",
                    reason: "",
                    agree: false,
                });
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3 text-slate-500">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        <p className="font-medium text-sm">Loading application status...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (hostStatus?.status === "PENDING") {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl text-center max-w-md w-full border border-slate-100 animate-in fade-in zoom-in duration-200">
                        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 animate-pulse" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            Application Under Review
                        </h1>
                        <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                            Your host application has been submitted successfully and is currently under review by our admin team.
                        </p>
                        <div className="mt-8 flex flex-col gap-3">
                            <button
                                onClick={() => navigate("/")}
                                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to Home Page
                            </button>
                            <button
                                onClick={() => navigate("/my-trips")}
                                className="w-full py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition cursor-pointer"
                            >
                                View My Bookings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Back Navigation Bar */}
            <div className="bg-blue-600/95 border-b border-blue-500/40 py-2.5 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center gap-2 text-white/90 hover:text-white text-xs sm:text-sm font-semibold transition cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home Page
                    </button>
                    <span className="text-xs text-blue-100 font-medium hidden sm:inline">
                        Organize trips & inspire travelers
                    </span>
                </div>
            </div>

            {/* ================= HERO SECTION ================= */}
            <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
                <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left */}
                        <div className="text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">
                                <Map size={18} />
                                JoinTrip Host Program
                            </span>

                            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
                                Turn Your
                                <span className="text-yellow-300"> Travel Passion</span>
                                <br />
                                Into Memorable Experiences
                            </h1>

                            <p className="mt-6 text-base sm:text-lg text-blue-100 leading-relaxed">
                                Become a verified JoinTrip Host and organize incredible trips, inspire travelers, and earn money while exploring beautiful destinations.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                <button
                                    className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-7 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
                                    onClick={() => {
                                        document.getElementById("host-form")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                >
                                    Start Your Journey
                                    <ArrowRight size={20} />
                                </button>
                                <button
                                    onClick={() => navigate("/")}
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-2xl border border-white/30 backdrop-blur-md transition cursor-pointer"
                                >
                                    <ArrowLeft size={18} /> Return Home
                                </button>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="flex justify-center">
                            <img
                                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=900"
                                alt="Travel Host"
                                className="w-full max-w-lg rounded-3xl shadow-2xl object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= BENEFITS ================= */}
            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                            Why Become a Host?
                        </h2>
                        <p className="mt-3 text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
                            Join hundreds of passionate hosts who help travelers discover amazing places while building meaningful experiences.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {benefits.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="mt-6 text-xl font-bold text-slate-900">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================= APPLICATION FORM ================= */}
            <section id="host-form" className="pb-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-10">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-slate-900">
                                Host Application Form
                            </h2>
                            <p className="mt-2 text-slate-500 text-sm">
                                Tell us about yourself. We'll review your application and get back to you soon.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="9876543210"
                                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                </div>

                                {/* Experience */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Hosting Experience
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        placeholder="Example: 3 Years"
                                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Your City"
                                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                </div>

                                {/* Languages */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Languages You Speak
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        name="languages"
                                        value={formData.languages}
                                        onChange={handleChange}
                                        placeholder="English, Hindi..."
                                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="mt-6">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Short Bio
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    placeholder="Tell travelers about your passion..."
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>

                            {/* Reason */}
                            <div className="mt-6">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Why do you want to become a JoinTrip Host?
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    placeholder="Share your motivation..."
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>

                            {/* Terms */}
                            <div className="mt-6 flex items-start gap-3">
                                <input
                                    required
                                    type="checkbox"
                                    name="agree"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    className="mt-1 w-5 h-5 accent-blue-600 rounded cursor-pointer"
                                />
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    I confirm that all the information provided is accurate. I agree to JoinTrip's Terms & Conditions and understand that my application will be reviewed before approval.
                                </p>
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {submitting ? "Submitting Application..." : "Submit Application"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BecomeHost;