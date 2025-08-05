import Employee from "../models/Employee.js";

// Create Employee
export const createEmployee = async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json(employee);
};

// Get All Employees
export const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

// Get Single Employee
export const getEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ message: "Not found" });
  res.json(employee);
};

// Update Employee
export const updateEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!employee) return res.status(404).json({ message: "Not found" });
  res.json(employee);
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
