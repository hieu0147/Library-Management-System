export interface CreateBookDto {
  title: string;
  author: string;
  description: string;
  category_ids: string[];
}

export interface UpdateBookDto {
  title?: string;
  author?: string;
  description?: string;
  category_ids?: string[];
} 