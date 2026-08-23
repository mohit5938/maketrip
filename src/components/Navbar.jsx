import { Menu, X, BookmarkCheck, User, ShieldCheck, LogIn, ChevronUp, Layers, Heart } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal } from "../redux/reducers/auth.js";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [quickMenuOpen, setQuickMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleMobileNavigate = (path) => {
        setIsOpen(false);
        setQuickMenuOpen(false);
        if (path) {
            navigate(path);
        }
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-18">
                        
                        {/* Brand Logo */}
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md shadow-pink-500/20 group-hover:scale-105 transition transform">
                                ♥
                            </div>
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-slate-900 via-pink-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                                JoinTrip
                            </span>
                        </Link>

                        {/* Right Side Buttons (Desktop) */}
                        <div className="hidden md:flex items-center gap-3">
                            {user ? (
                                <>
                                    <button
                                        onClick={() => navigate("/wishlist")}
                                        className="px-4 py-2 text-xs font-semibold text-rose-600 bg-rose-50/80 hover:bg-rose-100 rounded-full border border-rose-200/70 transition cursor-pointer flex items-center gap-1.5"
                                    >
                                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Wishlist
                                    </button>

                                    <button
                                        onClick={() => navigate("/my-trips")}
                                        className="px-4 py-2 text-xs font-semibold text-pink-600 bg-pink-50/80 hover:bg-pink-100 rounded-full border border-pink-200/70 transition cursor-pointer"
                                    >
                                        My Bookings
                                    </button>

                                    <button
                                        onClick={() => navigate("/host/dashboard")}
                                        className="px-4 py-2 text-xs font-semibold text-purple-700 bg-purple-50/80 hover:bg-purple-100 rounded-full border border-purple-200/70 transition cursor-pointer"
                                    >
                                        Host Dashboard
                                    </button>

                                    {user.role === "admin" && (
                                        <button
                                            onClick={() => navigate("/admin")}
                                            className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-full shadow-xs transition cursor-pointer"
                                        >
                                            Admin Panel
                                        </button>
                                    )}

                                    <button
                                        onClick={() => navigate("/profile")}
                                        className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-indigo-600 text-white font-bold text-sm flex items-center justify-center hover:opacity-90 transition shadow-sm cursor-pointer ml-1"
                                        title={user.full_name || "Profile"}
                                    >
                                        {user.full_name?.charAt(0).toUpperCase()}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => dispatch(openAuthModal())}
                                    className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 rounded-full shadow-md shadow-pink-500/20 transition cursor-pointer"
                                >
                                    Login / Sign Up
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-slate-700 hover:text-pink-600 transition cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Top Slide-Down / Slide-Up Menu Drawer */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-slate-100 shadow-xl ${
                        isOpen ? "max-h-96 opacity-100 py-3" : "max-h-0 opacity-0 py-0"
                    }`}
                >
                    <div className="flex flex-col px-4 gap-2.5 text-sm">
                        {user && (
                            <>
                                <button
                                    onClick={() => handleMobileNavigate("/wishlist")}
                                    className="py-2.5 px-4 text-xs font-semibold text-rose-600 bg-rose-50 rounded-xl text-left cursor-pointer transition flex items-center gap-2"
                                >
                                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                                    Wishlist
                                </button>
                                <button
                                    onClick={() => handleMobileNavigate("/my-trips")}
                                    className="py-2.5 px-4 text-xs font-semibold text-pink-600 bg-pink-50 rounded-xl text-left cursor-pointer transition flex items-center gap-2"
                                >
                                    <BookmarkCheck className="w-4 h-4" />
                                    My Bookings
                                </button>
                                <button
                                    onClick={() => handleMobileNavigate("/host/dashboard")}
                                    className="py-2.5 px-4 text-xs font-semibold text-purple-700 bg-purple-50 rounded-xl text-left cursor-pointer transition flex items-center gap-2"
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                    Host Dashboard
                                </button>
                                <button
                                    onClick={() => handleMobileNavigate("/profile")}
                                    className="py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl text-left cursor-pointer transition flex items-center gap-2"
                                >
                                    <User className="w-4 h-4 text-slate-500" />
                                    My Profile
                                </button>
                            </>
                        )}

                        {user?.role === "admin" && (
                            <button
                                onClick={() => handleMobileNavigate("/admin")}
                                className="py-2.5 px-4 text-xs font-semibold text-white bg-purple-600 rounded-xl text-left cursor-pointer transition"
                            >
                                Admin Panel
                            </button>
                        )}

                        {!user && (
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    dispatch(openAuthModal());
                                }}
                                className="py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl text-center cursor-pointer shadow-md flex items-center justify-center gap-2"
                            >
                                <LogIn className="w-4 h-4" /> Login / Sign Up
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Quick Action Floating Options Menu */}
            <div className="md:hidden fixed bottom-5 right-5 z-50">
                {/* Floating Options Menu Popover */}
                {quickMenuOpen && (
                    <div className="mb-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-3 min-w-[200px] animate-in fade-in slide-in-from-bottom-3 duration-200 space-y-1.5 text-xs font-medium">
                        <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                            Quick Switch Options
                        </div>
                        {user ? (
                            <>
                                <button
                                    onClick={() => handleMobileNavigate("/wishlist")}
                                    className="w-full p-2.5 rounded-xl bg-rose-50/80 text-rose-600 font-semibold flex items-center gap-2 text-left cursor-pointer"
                                >
                                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" /> Wishlist
                                </button>
                                <button
                                    onClick={() => handleMobileNavigate("/my-trips")}
                                    className="w-full p-2.5 rounded-xl bg-pink-50/80 text-pink-600 font-semibold flex items-center gap-2 text-left cursor-pointer"
                                >
                                    <BookmarkCheck className="w-4 h-4" /> My Bookings
                                </button>
                                <button
                                    onClick={() => handleMobileNavigate("/host/dashboard")}
                                    className="w-full p-2.5 rounded-xl bg-purple-50/80 text-purple-700 font-semibold flex items-center gap-2 text-left cursor-pointer"
                                >
                                    <ShieldCheck className="w-4 h-4" /> Host Dashboard
                                </button>
                                <button
                                    onClick={() => handleMobileNavigate("/profile")}
                                    className="w-full p-2.5 rounded-xl bg-slate-100 text-slate-800 font-semibold flex items-center gap-2 text-left cursor-pointer"
                                >
                                    <User className="w-4 h-4 text-slate-500" /> Profile
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    setQuickMenuOpen(false);
                                    dispatch(openAuthModal());
                                }}
                                className="w-full p-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                            >
                                <LogIn className="w-4 h-4" /> Login / Sign Up
                            </button>
                        )}
                    </div>
                )}

                {/* Floating Options Trigger Button */}
                <button
                    onClick={() => setQuickMenuOpen(!quickMenuOpen)}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-slate-900 to-indigo-900 text-white text-xs font-bold rounded-full shadow-2xl hover:shadow-indigo-500/20 active:scale-95 transition transform cursor-pointer border border-white/20"
                >
                    <Layers className="w-4 h-4 text-pink-400" />
                    <span>Options Menu</span>
                    {quickMenuOpen ? <ChevronUp className="w-3.5 h-3.5 rotate-180 transition" /> : <ChevronUp className="w-3.5 h-3.5 transition" />}
                </button>
            </div>
        </>
    );
};

export default Navbar;