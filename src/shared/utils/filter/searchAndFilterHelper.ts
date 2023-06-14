const searchAndFilterHelper = (
  searchTerm: string | undefined,
  filtersData: Record<string, unknown>,
  semesterSearchAndFilterFields: string[]
) => {
  const searchAndFilter = [];
  const filterDataArray = Object.keys(filtersData);
  if (searchTerm) {
    searchAndFilter.push({
      $or: semesterSearchAndFilterFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  } else {
    searchAndFilter.push({});
  }
  if (filterDataArray.length) {
    searchAndFilter.push({
      $and: filterDataArray.map(field => ({
        [field]: filtersData[field],
      })),
    });
  }
  return { $and: searchAndFilter };
};

export default searchAndFilterHelper;
