"use client";
import { useRouter } from "next/navigation";


export default function SubscriptionSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-center">
      <div className="max-w-lg w-full px-6 py-12 bg-purple-700 rounded-lg shadow-lg text-center">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg mb-8">
          Your subscription has been activated successfully. Enjoy premium content!
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg text-lg transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}