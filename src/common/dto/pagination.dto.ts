import { Max, Min } from 'class-validator';

export class Pagination {
  @Min(0)
  offset: number = 0;

  @Min(1)
  @Max(100)
  limit: number = 19;
}
