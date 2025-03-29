"use client";
import dotenv from "dotenv";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
dotenv.config();
const VerifyUser = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("activationToken");
    if (!token) setError("Activation token missing. Please register again.");
  }, []);

  const handleChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, ""); // Allow only numbers
    setOtp(onlyNumbers);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    const activationToken = localStorage.getItem("activationToken");
    if (!activationToken) {
      setError("Activation token missing. Please register again.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`,
        { otp, activationToken }
      );

      toast.success("Sign-in successful 🎉");
      localStorage.removeItem("activationToken");
      router.replace("/login"); // Prevents back navigation to OTP page
    } catch (error) {
      console.error("Error:", error);
      setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              name="otp"
              placeholder="Enter the OTP sent to your email"
              value={otp}
              onChange={handleChange}
              maxLength={6}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
