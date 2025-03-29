"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Script from "next/script";

// Backend URL running on port 5000
const BACKEND_URL = "http://localhost:5000"; 

export default function Subscription() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // We'll need the user's email for the premium access update

  // Plan details
  const plans = {
    monthly: {
      id: "premium-monthly",
      name: "JioCinema Premium Monthly",
      amount: 29, // ₹29 (backend multiplies by 100)
      currency: "INR",
      description: "Premium Monthly Subscription"
    },
    family: {
      id: "premium-family",
      name: "JioCinema Premium Family",
      amount: 89, // ₹89 (backend multiplies by 100)
      currency: "INR",
      description: "Premium Family Subscription"
    }
  };

  // Get user email on component mount
  useEffect(() => {
    // You can get the user email from localStorage, context, or session
    // For example:
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  // Handle Razorpay script loading
  const handleRazorpayLoad = () => {
    setRazorpayLoaded(true);
  };

  // Function to initialize payment
  const initializePayment = async () => {
    if (!selectedPlan) return;
    
    try {
      setLoading(true);
      
      // Get the selected plan details
      const planDetails = plans[selectedPlan];
      
      // Call your backend API to create a Razorpay order
      // Using the exact route from your server: /api/payment/order
      const response = await fetch(`${BACKEND_URL}/api/payment/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: planDetails.amount, // Your backend multiplies by 100
          currency: planDetails.currency,
          planId: planDetails.id,
        }),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      
      // Initialize Razorpay payment
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your public key from env
        amount: data.amount, // Amount from backend response (already in paise)
        currency: planDetails.currency,
        name: "JioCinema",
        description: planDetails.description,
        order_id: data.orderId,
        handler: function (response) {
          // Handle successful payment
          updatePremiumAccess(response);
        },
        prefill: {
          name: "", // You can prefill user data if available
          email: userEmail || "",
          contact: ""
        },
        notes: {
          planId: planDetails.id
        },
        theme: {
          color: "#d946ef" // Pink color matching your UI
        }
      };
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert("Unable to initialize payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Function to update premium access status after payment
  const updatePremiumAccess = async (paymentResponse) => {
    try {
      setLoading(true);
      
      // Using the exact route from your server: /api/payment/update-premium-access
      const response = await fetch(`${BACKEND_URL}/api/payment/update-premium-access`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          razorpayPaymentId: paymentResponse.razorpay_payment_id,
          razorpayOrderId: paymentResponse.razorpay_order_id,
          razorpaySignature: paymentResponse.razorpay_signature
        }),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (response.ok && data.message && data.message.isPremium ) {
        // Update local storage or context to reflect premium status
        localStorage.setItem("isPremium", "true");
        
        // Payment successful, redirect to success page
        router.push('/subscription/success');
      } else {
        alert('Payment verification failed');
      }
      
    } catch (error) {
      console.error("Premium access update failed:", error);
      alert("Payment was successful, but we couldn't update your premium status. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={handleRazorpayLoad}
      />
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="max-w-4xl w-full px-6 py-12">
          {/* Header */}
          <button
            className="text-5xl mb-4 -ml-28 hover:text-gray-300 transition"
            onClick={() => router.back()}
            aria-label="Go Back"
          >
            ←
          </button>
          <h1 className="text-4xl font-bold">JioCinema Premium</h1>
          <p className="mt-2 text-lg text-gray-300">
            Entertainment Redefined - The best of Hollywood, Before TV premieres,
            Blockbuster movies, Exclusive series, India&apos;s biggest Kids & Family hub +
            365 days of reality!
          </p>

          {/* Plans Section */}
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            {/* Premium Monthly Plan */}
            <div
              className={`p-6 rounded-lg flex-1 shadow-lg cursor-pointer transition ${
                selectedPlan === "monthly" ? "border-4 border-pink-500" : "bg-purple-700"
              }`}
              onClick={() => setSelectedPlan("monthly")}
            >
              <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-semibold rounded">
                SPECIAL OFFER
              </span>
              <h2 className="text-2xl font-bold mt-3">Premium Monthly</h2>
              <ul className="mt-3 text-sm space-y-2">
                <li> Ad-Free (except sports & live)</li>
                <li> Includes all Premium content</li>
                <li> Any 1 device at a time (up to Asli 4K quality)</li>
                <li> Download and watch anytime</li>
              </ul>
              <div className="mt-4 flex items-center">
                <span className="bg-yellow-500 px-3 py-1 text-black text-sm font-semibold rounded">
                  1 Month
                </span>
                <div className="ml-auto text-right">
                  <p className="text-3xl font-bold">₹29</p>
                  <p className="text-xs text-gray-300 line-through">₹59</p>
                  <p className="text-xs text-yellow-300">51% OFF</p>
                </div>
              </div>
            </div>

            {/* Family Plan */}
            <div
              className={`p-6 rounded-lg flex-1 shadow-lg cursor-pointer transition ${
                selectedPlan === "family" ? "border-4 border-pink-500" : "bg-purple-700"
              }`}
              onClick={() => setSelectedPlan("family")}
            >
              <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-semibold rounded">
                SPECIAL OFFER
              </span>
              <h2 className="text-2xl font-bold mt-3">Family</h2>
              <p className="mt-3 text-sm"> Enjoy all Premium plan benefits on up to 4 devices</p>
              <div className="mt-6 flex items-center">
                <span className="bg-yellow-500 px-3 py-1 text-black text-sm font-semibold rounded">
                  1 Month
                </span>
                <div className="ml-auto text-right">
                  <p className="text-3xl font-bold">₹89</p>
                  <p className="text-xs text-gray-300 line-through">₹149</p>
                  <p className="text-xs text-yellow-300">40% OFF</p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue & Pay Button */}
          <div className="mt-8 text-center">
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg text-lg transition disabled:opacity-50"
              disabled={!selectedPlan || loading || !razorpayLoaded}
              onClick={initializePayment}
            >
              {loading ? "Processing..." : "Continue & Pay"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}