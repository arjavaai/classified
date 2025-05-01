"use client";

import { useState, useEffect } from "react";
import { signUp, signIn, resetPassword, logOut, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AuthTestPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  // Use useEffect to handle client-side only code
  useEffect(() => {
    setIsClient(true);
    // Set up a listener for auth state changes
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
      });
      
      // Clean up the listener
      return () => unsubscribe();
    }
  }, []);

  const handleSignUp = async () => {
    if (!email || !password) {
      setStatus("Please enter email and password");
      return;
    }

    setLoading(true);
    setStatus("Signing up...");

    try {
      const result = await signUp(email, password);
      console.log("Signup result:", result);
      
      if (result.success) {
        setStatus("Signup successful! Please check your email for verification.");
        toast.success("Account created!");
      } else {
        setStatus(`Signup failed: ${result.error}`);
        toast.error(result.error);
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      setStatus(`Error: ${error.message}`);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setStatus("Please enter email and password");
      return;
    }

    setLoading(true);
    setStatus("Signing in...");

    try {
      const result = await signIn(email, password);
      console.log("Signin result:", result);
      
      if (result.success) {
        setStatus("Signin successful!");
        toast.success("Logged in!");
      } else {
        setStatus(`Signin failed: ${result.error}`);
        toast.error(result.error);
      }
    } catch (error: any) {
      console.error("Signin error:", error);
      setStatus(`Error: ${error.message}`);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!email) {
      setStatus("Please enter email");
      return;
    }

    setLoading(true);
    setStatus("Sending reset email...");

    try {
      const result = await resetPassword(email);
      console.log("Reset result:", result);
      
      if (result.success) {
        setStatus("Reset email sent successfully!");
        toast.success("Reset email sent!");
      } else {
        setStatus(`Reset failed: ${result.error}`);
        toast.error(result.error);
      }
    } catch (error: any) {
      console.error("Reset error:", error);
      setStatus(`Error: ${error.message}`);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setStatus("Logging out...");

    try {
      const result = await logOut();
      console.log("Logout result:", result);
      
      if (result.success) {
        setStatus("Logout successful!");
        toast.success("Logged out!");
      } else {
        setStatus(`Logout failed: ${result.error}`);
        toast.error(result.error);
      }
    } catch (error: any) {
      console.error("Logout error:", error);
      setStatus(`Error: ${error.message}`);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Firebase Auth Test</h1>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button onClick={handleSignUp} disabled={loading}>Sign Up</Button>
          <Button onClick={handleSignIn} disabled={loading}>Sign In</Button>
          <Button onClick={handleReset} disabled={loading}>Reset Password</Button>
          <Button onClick={handleLogout} disabled={loading}>Logout</Button>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-bold">Status:</p>
          <p className={status.includes("successful") ? "text-green-600" : "text-red-600"}>{status || "No action taken yet"}</p>
        </div>

        {isClient && (
          <div className="mt-6 text-sm text-gray-500">
            <p>Current auth state:</p>
            <p>{currentUser ? `Logged in as ${currentUser.email}` : "Not logged in"}</p>
            <p>Email verified: {currentUser?.emailVerified ? "Yes" : "No"}</p>
          </div>
        )}
      </div>
    </div>
  );
}