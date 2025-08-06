"use client";
import Navbar from "@/components/Navbar";
import EmployeeList from "@/components/EmployeeList";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Employee Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Manage your team members and their information
          </p>
        </div>
        <EmployeeList />
      </div>
    </div>
  );
}
