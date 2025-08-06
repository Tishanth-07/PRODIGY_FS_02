"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

interface EmployeeFormProps {
  employeeId?: string;
}

export default function EmployeeForm({ employeeId }: EmployeeFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: "",
    dateOfJoining: "",
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formFields = [
    { key: "name", label: "Full Name", type: "text", icon: "👤" },
    { key: "email", label: "Email Address", type: "email", icon: "📧" },
    { key: "phone", label: "Phone Number", type: "tel", icon: "📞" },
    { key: "department", label: "Department", type: "text", icon: "🏢" },
    { key: "position", label: "Position", type: "text", icon: "💼" },
    { key: "salary", label: "Salary", type: "number", icon: "💰" },
    {
      key: "dateOfJoining",
      label: "Date of Joining",
      type: "date",
      icon: "📅",
    },
  ];

  useEffect(() => {
    if (employeeId) {
      setLoading(true);
      axiosInstance
        .get(`/employees/${employeeId}`)
        .then((res) => {
          const emp = res.data;
          setForm({
            name: emp.name || "",
            email: emp.email || "",
            phone: emp.phone || "",
            department: emp.department || "",
            position: emp.position || "",
            salary: emp.salary?.toString() || "",
            dateOfJoining: emp.dateOfJoining
              ? emp.dateOfJoining.split("T")[0]
              : "",
          });
        })
        .catch((err) => {
          console.error("Error fetching employee:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [employeeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (employeeId) {
        await axiosInstance.put(`/employees/${employeeId}`, {
          ...form,
          salary: Number(form.salary),
        });
      } else {
        await axiosInstance.post("/employees", {
          ...form,
          salary: Number(form.salary),
        });
      }
      router.push("/dashboard");
    } catch (err) {
      console.error("Error saving employee:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading employee data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">
            {employeeId ? "Edit Employee Details" : "Add New Employee"}
          </h2>
          <p className="text-indigo-100 mt-1">
            {employeeId
              ? "Update the information below to modify employee details"
              : "Fill in the information below to add a new team member"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map((field) => (
              <div
                key={field.key}
                className={
                  field.key === "name" || field.key === "email"
                    ? "md:col-span-2"
                    : ""
                }
              >
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="mr-2">{field.icon}</span>
                  {field.label}
                </label>
                <input
                  name={field.key}
                  type={field.type}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={form[field.key as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white hover:border-slate-400"
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {employeeId ? "Updating..." : "Creating..."}
                </div>
              ) : employeeId ? (
                "Update Employee"
              ) : (
                "Create Employee"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
