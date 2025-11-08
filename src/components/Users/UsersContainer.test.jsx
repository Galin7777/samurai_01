import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UsersContainer } from './UsersContainer';
import * as reactRedux from 'react-redux';

const mockDispatch = jest.fn();
jest.mock('react-redux');

beforeEach(() => {
  reactRedux.useDispatch.mockReturnValue(mockDispatch);
});

test('показывает Preloader, когда идет загрузка', () => {
  reactRedux.useSelector.mockImplementation((selectorFn) => {
    if (selectorFn.name === 'selectIsFetching') return true;
    if (selectorFn.name === 'selectUsers') return [];
    if (selectorFn.name === 'currentPage') return 4;
    if (selectorFn.name === 'pageSize') return 10;
    if (selectorFn.name === 'totalUsersCount') return 20;
    return null;
  });
  render(<UsersContainer />);
  expect(screen.getByAltText('Loading...')).toBeInTheDocument();
});
