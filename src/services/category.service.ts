import Category, { ICategory } from '../models/category.model';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Types } from 'mongoose';

export const createCategory = async (data: CreateCategoryDto): Promise<ICategory> => {
  return Category.create(data);
};

export const getAllCategories = async (): Promise<ICategory[]> => {
  return Category.find();
};

export const getCategoryById = async (id: string): Promise<ICategory | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return Category.findById(id);
};

export const updateCategory = async (id: string, data: UpdateCategoryDto): Promise<ICategory | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return Category.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCategory = async (id: string): Promise<ICategory | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return Category.findByIdAndDelete(id);
}; 