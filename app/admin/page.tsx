"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatabaseStatus } from "@/components/database-status";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "sabbir") {
      sessionStorage.setItem("isAdminLoggedIn", "true");
      setIsLoggedIn(true);
      setError("");
      router.push("/portfolio");
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdminLoggedIn");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Admin {isLoggedIn ? "Dashboard" : "Login"}
        </h2>

        <DatabaseStatus />
        {isLoggedIn ? (
          <div className="space-y-4">
            <p className="text-gray-400">
              You are currently logged in as an administrator.
            </p>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
        ) : (
          <div className="max-w-md space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="bg-[#222222] border-gray-700"
              />
              <Button type="submit" className="w-full">
                Login as Admin
              </Button>
            </form>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )}
      </section>
    </div>
  );
}
