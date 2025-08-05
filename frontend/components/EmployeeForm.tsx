"use client";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

export default function EmployeeForm() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosInstance.post("/employees", form);
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-lg"
    >
      <h2 className="text-xl font-bold mb-4">Add Employee</h2>
      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          type={
            key === "salary"
              ? "number"
              : key === "dateOfJoining"
              ? "date"
              : "text"
          }
          placeholder={key}
          value={form[key as keyof typeof form]}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
