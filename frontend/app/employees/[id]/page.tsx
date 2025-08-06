"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  Edit3,
  Mail,
  Phone,
  Building,
  Briefcase,
  DollarSign,
  Calendar,
  User,
  Loader2,
} from "lucide-react";

interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  dateOfJoining: string;
}

export default function EmployeeDetailsPage() {
  const { isAuthenticated } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (params?.id) {
      axiosInstance
        .get(`/employees/${params.id}`)
        .then((res) => {
          setEmployee(res.data);
        })
        .catch((err) => {
          console.error("Error fetching employee:", err);
        })
        .finally(() => {
          setLoadingData(false);
        });
    }
  }, [params?.id]);

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-center space-x-3">
                <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                <span className="text-lg font-medium text-gray-700">
                  Loading employee details...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
              <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Employee Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                The requested employee could not be found in our system.
              </p>
              <button
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatSalary = (salary: number) => {
    return `LKR ${salary.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const detailItems = [
    {
      icon: Mail,
      label: "Email Address",
      value: employee.email,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: employee.phone,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Building,
      label: "Department",
      value: employee.department,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Briefcase,
      label: "Position",
      value: employee.position,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      icon: DollarSign,
      label: "Salary",
      value: formatSalary(employee.salary),
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Calendar,
      label: "Date of Joining",
      value: formatDate(employee.dateOfJoining),
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {employee.name}
                  </h1>
                  <p className="text-indigo-100 text-lg">
                    {employee.position} • {employee.department}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {detailItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${item.bgColor} rounded-lg p-3`}>
                      <IconComponent className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                        {item.label}
                      </h3>
                      <p className="text-lg font-semibold text-gray-900">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  router.push(`/employees/edit/${employee._id}`)
                }
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Edit3 className="h-5 w-5" />
                <span>Edit Employee</span>
              </button>

              <button
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
