import { Request, Response } from "express";
import { CategoryModels, CategoryService } from "../services/category_service";

const createController = (model: any, name: string) => ({
    
  async create(req: Request, res: Response) {
    try {
      const data = await CategoryService.create(model, req.body);

      return res.status(201).json({
        success: true,
        message: `${name} created successfully`,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Failed to create ${name}`,
        error,
      });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const data = await CategoryService.getAll(model);

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Failed to fetch ${name}`,
        error,
      });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const data = await CategoryService.getById(model, req.params.id as string);

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Failed to fetch ${name}`,
        error,
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const data = await CategoryService.update(model, {
        ...req.body,
        id: req.params.id,
      });

      return res.json({
        success: true,
        message: `${name} updated successfully`,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Failed to update ${name}`,
        error,
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await CategoryService.delete(model, req.params.id as string);

      return res.json({
        success: true,
        message: `${name} deleted successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Failed to delete ${name}`,
        error,
      });
    }
  },
});

export default {

  book: createController(
    CategoryModels.book, 
    "Book Category"),
  
  maintenance: createController(
    CategoryModels.maintenance,
    "Maintenance Category"
  ),

  expense: createController(
    CategoryModels.expense,
    "Expense Category"
  ),
};