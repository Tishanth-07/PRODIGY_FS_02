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
    <div>
      <Navbar />
      <div className="p-6">
        <EmployeeList />
      </div>
    </div>
  );
}
