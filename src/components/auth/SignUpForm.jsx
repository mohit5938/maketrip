
import { useState } from "react";
import axios from "axios";
import GoogleLogin from "./GoogleLogin.jsx";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userExists, closeAuthModal } from "../../redux/reducers/auth.js";
import {server} from "../../constants/constant.js"
const SignUpForm = ({ setScreen }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const { redirectPath } = useSelector(
        (state) => state.auth
    );

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const validate = () => {
        let newErrors = {};

        if (!form.full_name.trim()) {
            newErrors.full_name = "Full name is required";
        } else if (form.full_name.length < 3) {
            newErrors.full_name =
                "Name must be at least 3 characters";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                form.email
            )
        ) {
            newErrors.email = "Invalid email address";
        }

        if (!form.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(form.phone)) {
            newErrors.phone =
                "Phone number must be exactly 10 digits";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 8) {
            newErrors.password =
                "Password must be at least 8 characters";
        }

        if (form.confirmPassword !== form.password) {
            newErrors.confirmPassword =
                "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            const { data } = await axios.post(
                `${server}user/signup`,
                {
                    full_name: form.full_name,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(userExists(data.user));
            dispatch(closeAuthModal());
            toast.success(
                data.message || "Account Created Successfully 🎉"
            );

            setScreen("login");
            navigate(redirectPath || "/");
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message ||
                "Signup Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-2">
                Create Account
            </h2>

            <p className="text-center text-gray-500 mb-2">
                Join JoinTrip and start exploring
            </p>

            <form
                onSubmit={handleSignup}
                className="space-y-4"
            >
                {/* Full Name */}
                <div>
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        value={form.full_name}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-pink-500 outline-none"
                    />

                    {errors.full_name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.full_name}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-pink-500 outline-none"
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-2  focus:ring-2 focus:ring-pink-500 outline-none"
                    />

                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
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
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-2 pr-12 focus:ring-2 focus:ring-pink-500 outline-none"
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

                {/* Confirm Password */}
                <div>
                    <div className="relative">
                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-2 pr-12 focus:ring-2 focus:ring-pink-500 outline-none"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2.5 rounded-xl font-semibold transition"
                >
                    {loading
                        ? "Creating Account..."
                        : "Create Account"}
                </button>
            </form>

            <GoogleLogin setScreen={setScreen} />

            {/* Switch Login */}
            <div className="text-center mt-2">
                <span className="text-gray-500">
                    Already have an account?
                </span>

                <button
                    onClick={() => setScreen("login")}
                    className="ml-2 text-pink-500 font-semibold hover:underline"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default SignUpForm;