const paginateData = (data, page_size, page_number) => {
    if (!data) return [];
    return data.slice((page_number - 1) * page_size, page_number * page_size);
};

export default paginateData;
