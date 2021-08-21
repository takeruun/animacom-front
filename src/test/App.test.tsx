import { render, screen } from '@testing-library/react';
import App from 'App';
import { Provider } from 'react-redux';
import { history, store } from 're-ducks/store/store';
import { ConnectedRouter } from 'connected-react-router';

test('render App', () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
  );
  expect(screen.getByText(/AnimaCom/i)).toBeInTheDocument();
});
