import { Provider, useSelector } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import { store } from 're-ducks/store/store';
import { PostEdit } from 'components/pages/posts';
import userEvent from '@testing-library/user-event'
import { PostType } from 'modules/postModule';
import axios from 'axios';

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

  describe('新規投稿できる', () => {
    beforeEach(() => {
      useSelectorMock.mockImplementation((selector: any) => selector(mockStore));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    const mockStore = {
      post: {
        loading: false,
      },
      category: {
        categories: [
          { id: '1', name: 'TEST_CATEGORY' },
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

      userEvent.click(screen.getAllByRole('button')[1]);
      userEvent.click(screen.getByText('TEST_CATEGORY'));
      expect(screen.getAllByText('TEST_CATEGORY')[0]).toBeInTheDocument();
    });

    it('「投稿」が表示されている', () => {
      renderComponent();

      expect(screen.getByText('投稿！')).toBeInTheDocument();
    });
  });

  describe('編集できる', () => {
    const axiosMock = axios as jest.Mocked<typeof axios>;
    const renderComponent = () => render(
      <Provider store={store}>
        <PostEdit />
      </Provider>
    );

    beforeEach(() => {
      // @ts-ignore
      delete window.location;
      // @ts-ignore
      window.location = {
        pathname: 'http://dummy.com/post/edit/1',
      };
      useSelectorMock.mockImplementation((selector: any) => selector(mockStore));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    const mockStore = {
      post: {
        loading: false,
      },
      category: {
        categories: [
          { id: '1', name: 'UPDATE_CATEGORY' },
        ],
      },
    };
    const post: PostType = {
      id: '1',
      title: 'TEST_Title',
      subTitle: 'SubTitle',
      body: 'Boyd',
      images: [],
      categoryId: '1',
      cuteCount: 0,
      favCount: 0,
      goodCount: 0,
      coolCount: 0,
    };

    it('タイトル再入力できる', async () => {
      axiosMock.get.mockImplementationOnce(() => Promise.resolve({ data: { post } }));
      renderComponent();

      const titleInput = screen.getByText('TEST_Title');
      fireEvent.change(titleInput, {
        target: {
          value: 'UPDATE_Title'
        }
      });

      expect(screen.getByText('UPDATE_Title')).toBeInTheDocument();
    });

    it('サブタイトル再入力できる', async () => {
      renderComponent();

      const titleInput = screen.getByPlaceholderText('サブタイトル🐾');
      fireEvent.change(titleInput, {
        target: {
          value: 'サブタイトル'
        }
      });
      expect(screen.getByText('サブタイトル')).toBeInTheDocument();
    });

    it('説明再入力できる', async () => {
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

      userEvent.click(screen.getAllByRole('button')[1]);
      userEvent.click(screen.getByText('TEST_CATEGORY'));
      expect(screen.getAllByText('TEST_CATEGORY')[0]).toBeInTheDocument();
    });

    it('「投稿」が表示されている', () => {
      renderComponent();

      expect(screen.getByText('投稿！')).toBeInTheDocument();
    });

  });

});