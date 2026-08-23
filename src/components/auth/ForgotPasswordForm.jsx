import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { server } from "../../constants/constant.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userExists, closeAuthModal } from "../../redux/reducers/auth.js";

const ForgotPasswordForm = ({ setScreen }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { redirectPath } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // SEND RESET OTP
  const sendResetOtp = async () => {
    if (!form.email.trim()) {
      return toast.error("Email is required");
    }

    
try {
  setLoading(true);

  const { data } = await axios.post(
    `${server}user/forgot-password`,
    {
      email: form.email,
    },
    {
      withCredentials: true,
    }
  );

  toast.success(
    data.message || "OTP Sent Successfully"
  );

  setStep(2);
} catch (error) {
  toast.error(
    error?.response?.data?.message ||
      "Failed to send OTP"
  );
} finally {
  setLoading(false);
}


  };

  // VERIFY OTP
  const verifyOtp = async () => {
    if (form.otp.length !== 6) {
      return toast.error(
        "OTP must be 6 digits"
      );
    }

  
try {
  setLoading(true);

  const { data } = await axios.post(
    `${server}user/verify-reset-otp`,
    {
      email: form.email,
      otp: form.otp,
    },
    {
      withCredentials: true,
    }
  );

  toast.success(
    data.message || "OTP Verified"
  );

  setStep(3);
} catch (error) {
  toast.error(
    error?.response?.data?.message ||
      "Invalid OTP"
  );
} finally {
  setLoading(false);
}


  };

  // RESET PASSWORD
  const resetPassword = async () => {
    if (!form.newPassword.trim()) {
      return toast.error(
        "Password is required"
      );
    }

    
if (form.newPassword.length < 8) {
  return toast.error(
    "Password must be at least 8 characters"
  );
}

if (
  form.newPassword !==
  form.confirmPassword
) {
  return toast.error(
    "Passwords do not match"
  );
}

try {
  setLoading(true);

  const { data } = await axios.post(
    `${server}user/reset-password`,
    {
      email: form.email,
      otp: form.otp,
      newPassword: form.newPassword,
    },
    {
      withCredentials: true,
    }
  );

  toast.success(
    data.message ||
      "Password Reset Successfully 🎉"
  );

  setScreen("login");
  dispatch(closeAuthModal());
  navigate(redirectPath || "/");

} catch (error) {
  toast.error(
    console.log(error) ||
    error?.response?.data?.message ||
      "Failed to reset password"
  );
} finally {
  setLoading(false);
}

  };

  return (<div> <h2 className="text-3xl font-bold text-center mb-2">
    Forgot Password </h2>

    
    <p className="text-center text-gray-500 mb-6">
      Recover your JoinTrip account
    </p>

    {step === 1 && (
      <>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-500"
        />

        <button
          onClick={sendResetOtp}
          disabled={loading}
          className="w-full mt-4 bg-pink-500 text-white py-3 rounded-xl font-semibold"
        >
          {loading
            ? "Sending OTP..."
            : "Send Reset OTP"}
        </button>
      </>
    )}

    {step === 2 && (
      <>
        <p className="text-center text-sm text-gray-500 mb-4">
          OTP sent to {form.email}
        </p>

        <input
          type="text"
          maxLength={6}
          name="otp"
          placeholder="Enter 6 Digit OTP"
          value={form.otp}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              otp: e.target.value.replace(
                /\D/g,
                ""
              ),
            }))
          }
          className="w-full border rounded-xl p-3 text-center tracking-[10px] text-xl outline-none focus:ring-2 focus:ring-pink-500"
        />

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full mt-4 bg-pink-500 text-white py-3 rounded-xl font-semibold"
        >
          {loading
            ? "Verifying..."
            : "Verify OTP"}
        </button>

        <button
          onClick={sendResetOtp}
          className="w-full mt-3 text-pink-500"
        >
          Resend OTP
        </button>
      </>
    )}

    {step === 3 && (
      <div className="space-y-4">

        <div className="relative">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
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
            className="w-full border rounded-xl p-3 pr-12 outline-none focus:ring-2 focus:ring-pink-500"
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

        <button
          onClick={resetPassword}
          disabled={loading}
          className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold"
        >
          {loading
            ? "Resetting..."
            : "Reset Password"}
        </button>
      </div>
    )}

    <div className="text-center mt-6">
      <button
        onClick={() => setScreen("login")}
        className="text-pink-500 font-semibold"
      >
        ← Back To Login
      </button>
    </div>
  </div>


);
};

export default ForgotPasswordForm;
