import {
  CustomPaginationOptions,
  IPaginationOptions,
} from '../../interfaces/interfaces';

const paginationHelper = (
  paginationOptions: Partial<IPaginationOptions>
): CustomPaginationOptions => {
  const page = Number(paginationOptions.page) || 1;
  const limit = Number(paginationOptions.limit) || 10;
  const sortBy = paginationOptions.sortBy || 'createdAt';
  const sortOrder = paginationOptions.sortOrder || 'asc';
  const skip = Number((page - 1) * limit);

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default paginationHelper;
