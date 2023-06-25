import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type IPaginationOptions = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
};

export type IGenericPaginationResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type CustomPaginationOptions = {
  skip: number;
  page: number;
  limit: number;
  sort: {
    [x: string]: 'asc' | 'desc';
  };
};


export interface IAuthenticatedRequest extends Request {
  user?: JwtPayload;
}