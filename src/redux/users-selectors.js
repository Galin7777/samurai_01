export const selectUsers = (store) => store.usersPage.users;
export const selectCurrentPage = (store) => store.usersPage.currentPage;
export const selectPageSize = (store) => store.usersPage.pageSize;
export const selectTotalUsersCount = (store) => store.usersPage.totalUsersCount;
export const selectIsFetching = (store) => store.usersPage.isFetching;
