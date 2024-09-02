interface Pagination {
  page: number;
  totalPage: number;
  limit: number;
  next?: number;
  prev?: number;
  totalRooms: number;
}

class APIResponse<T> {
  constructor(
    public success: boolean,
    public statusCode: number,
    public message: string,
    public data: T,
    public pagination?: Pagination,
  ) {}
}

export default APIResponse;
