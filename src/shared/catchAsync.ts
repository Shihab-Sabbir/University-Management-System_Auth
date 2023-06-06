import { NextFunction, Request, Response } from 'express';

const catchAsync = (fn: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;

// catchAsync(function) {
// --> taking a function as a parameter
// --> returning same function by adding it into a try catch block.
// return async function {
//     try {...........}
//     catch (error) {next(error)}
// }
