export const size = (pageSize, page, data = [], totalItem) => {
    return totalItem - pageSize * page
}