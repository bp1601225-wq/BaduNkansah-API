import { Request, Response } from "express";
import { EmplyeeModel } from "../services/Employee/EmployeeModel";
import { EmployeeServices } from "../services/Employee/EmployeeServices";

const model = EmplyeeModel.Employee
export const EmployeeController = {

  // Get all employees
  async getAllEmployees(_req: Request, res: Response) {
    try {
      const employees = await EmployeeServices.getAll(
        model
      );

      return res.status(200).json({
        success: true,
        data: employees,
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Error fetching employees",
      });
    }
  },


  // Get employee by id
  async getEmployeeById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const employee = await EmployeeServices.getById(
        model,
        id as string
      );


      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }


      return res.status(200).json({
        success: true,
        data: employee,
      });


    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Error fetching employee",
      });
    }
  },


  // Create employee
  async createEmployee(req: Request, res: Response) {
    try {

      const employee = await EmployeeServices.create(
        model,
        req.body
      );


      return res.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: employee,
      });


    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Error creating employee",
      });
    }
  },


  // Update employee
  async updateEmployee(req: Request, res: Response) {
    try {

      const employee = await EmployeeServices.update(
        model,
        {
          id: req.params.id,
          ...req.body,
        }
      );


      return res.status(200).json({
        success: true,
        message: "Employee updated successfully",
        data: employee,
      });


    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Error updating employee",
      });
    }
  },


  // Delete employee
  async deleteEmployee(req: Request, res: Response) {
    try {

      await EmployeeServices.delete(
model,
        req.params.id as string
      );


      return res.status(200).json({
        success: true,
        message: "Employee deleted successfully",
      });


    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Error deleting employee",
      });
    }
  },

};