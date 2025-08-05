"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";

interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    axiosInstance.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  return (
    <div>
      <Link
        href="/employees/add"
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        + Add Employee
      </Link>
      <table className="w-full border-collapse bg-white shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Position</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td className="border p-2">{emp.name}</td>
              <td className="border p-2">{emp.email}</td>
              <td className="border p-2">{emp.position}</td>
              <td className="border p-2 flex gap-2">
                <Link
                  href={`/employees/edit/${emp._id}`}
                  className="bg-yellow-500 px-2 py-1 text-white rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    axiosInstance.delete(`/employees/${emp._id}`).then(() => {
                      setEmployees((prev) =>
                        prev.filter((e) => e._id !== emp._id)
                      );
                    });
                  }}
                  className="bg-red-500 px-2 py-1 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
