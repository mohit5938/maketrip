import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { userExists, closeAuthModal } from "../../redux/reducers/auth.js";
import {  toast } from "react-toastify";
import {server} from "../../constants/constant.js"
import GoogleLogin from './GoogleLogin.jsx'
const LoginForm = ({ setScreen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { redirectPath } = useSelector(
        (state) => state.auth
    );
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        let newErrors = {};

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
        ) {
            newErrors.email = "Invalid email address";
        }

        if (!form.password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            const { data } = await axios.post(
                `${server}user/signin`,
                form,
                {
                    withCredentials: true,
                }
            );

            dispatch(userExists(data.user));
            dispatch(closeAuthModal());

            toast.success("Login Successful 🎉");
            navigate(redirectPath || "/");
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(
                error?.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

  

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-2">
                Login
            </h2>

            <p className="text-center text-gray-500 mb-4">
                Welcome back to JoinTrip
            </p>

            <form
                onSubmit={handleLogin}
                className="space-y-4"
            >
                {/* Email */}
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <div className="relative">
                        <input
                            type={
                                showPassword ? "text" : "password"
                            }
                            name="password"
                            placeholder="Enter Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 pr-12 outline-none focus:ring-2 focus:ring-pink-500"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() =>
                            setScreen("forgot-password")
                        }
                        className="text-pink-500 text-sm hover:underline"
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* OTP Login */}
                <button
                    type="button"
                    onClick={() =>
                        setScreen("otp-login")
                    }
                    className="w-full border border-pink-500 text-pink-500 py-2 rounded-xl font-semibold hover:bg-pink-50 transition"
                >
                    Login with OTP
                </button>
            </form>

            {/* Google Login */}
          <GoogleLogin setScreen={setScreen} />
            {/* Signup */}
            <div className="text-center mt-2">
                <span className="text-gray-500">
                    Don't have an account?
                </span>

                <button
                    onClick={() => setScreen("signup")}
                    className="ml-2 text-pink-500 font-semibold hover:underline"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default LoginForm;