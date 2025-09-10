export interface BorrowBookDto {
  user_id: string;
  book_id: string;
}

export interface ReturnBookDto {
  returned_at: Date;
} 