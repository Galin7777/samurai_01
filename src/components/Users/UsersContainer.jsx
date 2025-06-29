import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Users } from './Users';
import { setCurrentPageAC } from '../../redux/users-reduser';
import { Preloader } from '../common/Preloader/Preloader';
import { getUsers } from '../../redux/users-reduser';
import { selectUsers } from '../../redux/users-selectors';
import { selectCurrentPage } from '../../redux/users-selectors';
import { selectPageSize } from '../../redux/users-selectors';
import { selectTotalUsersCount } from '../../redux/users-selectors';
import { selectIsFetching } from '../../redux/users-selectors';

export const UsersContainer = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const totalUsersCount = useSelector(selectTotalUsersCount);
  const isFetching = useSelector(selectIsFetching);

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize)); // вынесла в редьюсер
  }, [dispatch, currentPage, pageSize]); // вынесла

  const onPageChanged = (pageNumber) => {
    dispatch(setCurrentPageAC(pageNumber));
  };

  const pagesCount = Math.ceil(totalUsersCount / pageSize); // вынесла в редьюсер
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <>
      {isFetching ? <Preloader /> : (
        <Users
          users={users}
          currentPage={currentPage}
          pages={pages}
          onPageChanged={onPageChanged}
          portionSize={10}
        />
      )}
    </>
  );
};
