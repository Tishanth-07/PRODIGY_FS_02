"use client";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="font-bold">Employee Management</h1>
      <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">
        Logout
      </button>
    </nav>
  );
}
