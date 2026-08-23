import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {server} from "../../constants/constant.js"
import { useDispatch, useSelector } from "react-redux";
import {
    userExists,
    closeAuthModal,
} from "../../redux/reducers/auth";

import { useNavigate } from "react-router-dom";

const OtpLoginForm = ({ setScreen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { redirectPath } = useSelector(
        (state) => state.auth
    );

    const [step, setStep] = useState(1);

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");

    const [otp, setOtp] = useState("");

    const sendOtp = async () => {
        if (!email.trim()) {
            return toast.error("Email is required");
        }

        try {
            setLoading(true);

            const { data } = await axios.post(
                `${server}user/send-login-otp`,
                { email },
                {
                    withCredentials: true,
                }
            );

            toast.success(
                data.message || "OTP sent successfully"
            );

            setStep(2);
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message ||
                "Failed to send OTP"
            );
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        if (otp.length !== 6) {
            return toast.error(
                "OTP must be 6 digits"
            );
        }

        try {
            setLoading(true);

            const { data } = await axios.post(
                `${server}user/verify-login-otp`,
                {
                    email,
                    otp,
                },
                {
                    withCredentials: true,
                }
            );

            dispatch(userExists(data.user));

            dispatch(closeAuthModal());

            toast.success(
                data.message || "Login Successful 🎉"
            );

            navigate(redirectPath || "/");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Invalid OTP"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-2">
                OTP Login
            </h2>

            <p className="text-center text-gray-500 mb-6">
                Login securely using OTP
            </p>

            {/* STEP 1 */}
            {step === 1 && (
                <>
                    <input
                        type="email"
                        placeholder="Enter Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    <button
                        onClick={sendOtp}
                        disabled={loading}
                        className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold"
                    >
                        {loading
                            ? "Sending OTP..."
                            : "Send OTP"}
                    </button>
                </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
                <>
                    <div className="mb-3 text-center text-sm text-gray-500">
                        OTP sent to
                        <span className="font-semibold ml-1">
                            {email}
                        </span>
                    </div>

                    <input
                        type="text"
                        maxLength={6}
                        placeholder="Enter 6 Digit OTP"
                        value={otp}
                        onChange={(e) =>
                            setOtp(
                                e.target.value.replace(/\D/g, "")
                            )
                        }
                        className="w-full border rounded-xl p-3 text-center tracking-[10px] text-xl outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    <button
                        onClick={verifyOtp}
                        disabled={loading}
                        className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold"
                    >
                        {loading
                            ? "Verifying..."
                            : "Verify OTP"}
                    </button>

                    <button
                        onClick={sendOtp}
                        className="w-full mt-3 text-pink-500 font-medium"
                    >
                        Resend OTP
                    </button>
                </>
            )}

            {/* Footer */}
            <div className="text-center mt-6">
                <button
                    onClick={() => setScreen("login")}
                    className="text-pink-500 font-semibold"
                >
                    ← Back to Login
                </button>
            </div>
        </div>
    );
};

export default OtpLoginForm;