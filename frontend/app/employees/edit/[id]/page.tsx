"use client";
import EmployeeForm from "@/components/EmployeeForm";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditEmployeePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const employeeId = params?.id as string;

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with navigation */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-4 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Edit Employee
          </h1>
          <p className="text-slate-600 text-lg">
            Update employee information and details
          </p>
        </div>

        <EmployeeForm employeeId={employeeId} />
      </div>
    </div>
  );
}
