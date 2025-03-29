"use client"
import toast from "react-hot-toast";
import dotenv from "dotenv";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
dotenv.config(); 
export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = response.data;
  
      if (response.status === 200) {
        if (data.redirect) {
          toast.error("User already exists! Redirecting to login...");
          setTimeout(() => router.push("/login"), 1500);
        } else {
            localStorage.setItem("activationToken", data.activationToken);
            toast.success(data.message); // Show success message
            setTimeout(() => router.push("/verify"), 1500);
        }
      }
    } catch (err) {
      if (err.response) {
        console.log("Error response:", err.response.data);
        if (err.response.data.redirect) {
          console.log("Redirecting to:", err.response.data.redirect);
          router.push(err.response.data.redirect); // Correct Next.js navigation
        }
      } else {
        console.error("Signup error:", err);
        setError("Something went wrong. Please try again.");
      }
    }  finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing Up..." : "Signup"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
