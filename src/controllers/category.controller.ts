import { Request, Response } from 'express';
import * as categoryService from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body as CreateCategoryDto);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: 'Tạo category thất bại', error: err });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Lấy danh sách category thất bại', error: err });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Không tìm thấy category' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Lấy category thất bại', error: err });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body as UpdateCategoryDto);
    if (!category) return res.status(404).json({ message: 'Không tìm thấy category' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: 'Cập nhật category thất bại', error: err });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    if (!category) return res.status(404).json({ message: 'Không tìm thấy category' });
    res.json({ message: 'Xóa category thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Xóa category thất bại', error: err });
  }
}; 