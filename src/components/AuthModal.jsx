import { useDispatch, useSelector } from "react-redux";
import { closeAuthModal } from "../redux/reducers/auth.js";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./auth/LoginForm.jsx"
import SignUpForm from "./auth/SignUpForm.jsx"
import OtpLoginForm from "./auth/OtpLoginForm.jsx"
import { useState } from "react";
import ForgotPasswordForm from './auth/ForgotPasswordForm.jsx';

const AuthModal = () => {
    const [screen, setScreen] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authModal } = useSelector((state) => state.auth);

    if (!authModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative w-[90%] max-w-md bg-white rounded-3xl shadow-2xl p-6">

                {/* Close Button */}
                <button
                    onClick={() => dispatch(closeAuthModal())}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <X size={24} />
                </button>

                {/* Logo */}
                <div className="flex justify-center mb-5">
                    <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center text-white text-3xl">
                        ✈️
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-3xl font-bold text-center">
                    Welcome to JoinTrip
                </h2>

                {screen === "login" && (
                    <LoginForm setScreen={setScreen} />
                )}

                {screen === "signup" && (
                    <SignUpForm setScreen={setScreen} />
                )}

                {screen === "otp-login" && (
                    <OtpLoginForm setScreen={setScreen} />
                )}

                {screen === "forgot-password" && (
                    <ForgotPasswordForm setScreen={setScreen} />
                )}

                <p className="text-center text-sm text-gray-400 mt-4">
                    By continuing you agree to our Terms & Privacy Policy
                </p>
            </div>
        </div>
    );
};

export default AuthModal;