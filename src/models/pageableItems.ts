export interface PageableItems<T> {
  items: T[];
  totalPages: number;
  page: number;
}
