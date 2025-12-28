import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const isMatch =
    newPassword.length >= 6 &&
    confirmPassword.length >= 6 &&
    newPassword === confirmPassword;

  // STEP 1 
  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        serverUrl + "/api/auth/sendotp",
        { email },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 
  const verifyOTP = async () => {
    setLoading(true);
    setOtpError("");
    try {
      const res = await axios.post(
        serverUrl + "/api/auth/verifyotp",
        { email, otp },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setStep(3);
    } catch {
      setOtp("");
      setOtpError("Invalid code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* STEP 3 */
  const resetPassword = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        serverUrl + "/api/auth/resetpassword",
        { email, password: newPassword },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br
    from-[#fbc2eb] via-[#a6c1ee] to-[#c2e9fb]  flex items-center justify-center px-4">

      <div className="w-full max-w-lg rounded-2xl bg-[#111827] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">


        <div className="px-8 pt-8 pb-6 border-b border-white/10">
          <h1 className="text-2xl font-semibold text-white">
            Forgot Your Password
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Follow the steps below to reset your password
          </p>


          <div className="mt-6 flex gap-3 text-xs">
            {["Email", "Verify", "Reset"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className={`h-6 w-6 rounded-full flex items-center justify-center
                  ${step > i
                      ? "bg-emerald-500 text-black"
                      : step === i + 1
                        ? "bg-white text-black"
                        : "bg-white/10 text-white/40"
                    }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`${step === i + 1
                      ? "text-white"
                      : "text-white/40"
                    }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>


        <div className="px-8 py-8">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <label className="block text-sm text-gray-300 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg bg-[#0b0f19] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30"
              />

              <button
                onClick={sendOtp}
                disabled={!email || loading}
                className="mt-6 w-full rounded-lg bg-white text-black py-3 text-sm font-medium hover:bg-gray-300 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? <ClipLoader size={18} /> : "Send verification code"}
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <label className="block text-sm text-gray-300 mb-1">
                Verification code
              </label>
              <input
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="4 digit code"
                className={`w-full text-center tracking-[0.4em] rounded-lg bg-[#0b0f19] border px-4 py-3 text-sm text-white focus:outline-none ${otpError ? "border-red-500" : "border-white/10"
                  }`}
              />

              {otpError && (
                <p className="mt-2 text-xs text-red-400">{otpError}</p>
              )}

              <button
                onClick={verifyOTP}
                disabled={otp.length !== 4 || loading}
                className="mt-6 w-full rounded-lg bg-white text-black py-3 text-sm font-medium hover:bg-gray-200 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? <ClipLoader size={18} /> : "Verify code"}
              </button>

              <button
                onClick={sendOtp}
                className="mt-4 text-xs text-gray-400 hover:text-white cursor-pointer"
              >
                Resend code
              </button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
          
              <label className="block text-sm text-gray-300 mb-1">
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full rounded-lg bg-[#0b0f19] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30"
              />

              
              {newPassword.length > 0 && newPassword.length < 6 && (
                <p className="mt-2 text-xs text-rose-600">
                  Password must be at least 6 characters
                </p>
              )}

            
              <div className="mt-5">
                <label className="block text-sm text-gray-300 mb-1">
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full rounded-lg bg-[#0b0f19] border border-white/10 px-4 py-3 pr-10 text-sm text-white focus:outline-none"
                  />

                  
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                  >
                    👁
                  </button>
                </div>

                
                {confirmPassword.length > 0 &&
                  newPassword.length >= 6 &&
                  newPassword !== confirmPassword && (
                    <p className="mt-2 text-xs text-red-400">
                      Passwords do not match
                    </p>
                  )}
              </div>

              
              <button
                onClick={resetPassword}
                disabled={!isMatch || loading}
                className="mt-7 w-full rounded-lg bg-emerald-500 text-black py-3 text-sm font-medium hover:bg-emerald-400 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? <ClipLoader size={18} /> : "Save new password"}
              </button>
            </>
          )}




        </div>

        {/* footer */}
        <div className="px-8 pb-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-xs text-rose-500 hover:text-white cursor-pointer"
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
