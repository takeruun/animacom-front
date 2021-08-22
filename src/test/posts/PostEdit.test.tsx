import { Provider, useSelector } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import { store } from 're-ducks/store/store';
import { PostEdit } from 'components/pages/posts';
import userEvent from '@testing-library/user-event';

const mockDispatch = jest.fn();
jest.mock('axios');
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
  connect: () => (ReactComponent: any) => ({
    ReactComponent
  }),
  Provider: ({ children }: any) => children,
}));

describe('renders post edit', () => {
  const useSelectorMock = useSelector as jest.Mock;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector: any) => selector(mockStore));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockStore = {
    post: {
      loading: false,
    },
    category: {
      categories: [
        { id: '1', name: 'category' },
      ],
    },
  };
  const renderComponent = () => render(
    <Provider store={store}>
      <PostEdit />
    </Provider>
  );

  it('タイトル入力できる', async () => {
    renderComponent();

    const titleInput = screen.getByPlaceholderText('タイトル🐾');
    fireEvent.change(titleInput, {
      target: {
        value: 'タイトル'
      }
    });
    expect(screen.getByText('タイトル')).toBeInTheDocument();
  });

  it('サブタイトル入力できる', async () => {
    renderComponent();

    const titleInput = screen.getByPlaceholderText('サブタイトル🐾');
    fireEvent.change(titleInput, {
      target: {
        value: 'サブタイトル'
      }
    });
    expect(screen.getByText('サブタイトル')).toBeInTheDocument();
  });

  it('説明入力できる', async () => {
    renderComponent();

    const titleInput = screen.getByPlaceholderText('説明🐾');
    fireEvent.change(titleInput, {
      target: {
        value: '説明'
      }
    });
    expect(screen.getByText('説明')).toBeInTheDocument();
  });

  it('カテゴリ選択できる', async () => {
    renderComponent();

    fireEvent.change(screen.getAllByRole('button')[1], {
      target: {
        value: '1'
      }
    });
    fireEvent.click(screen.getByText('category'));
    expect(screen.getByText('category')).toBeInTheDocument();
  });

  it('「投稿」が表示されている', () => {
    renderComponent();

    expect(screen.getByText('投稿！')).toBeInTheDocument();
  });

});