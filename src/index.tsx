import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { history, store } from 're-ducks/store/store';
import { ConnectedRouter } from 'connected-react-router';
// import { createBrowserHistory } from 'history';
import './assets/reset.css';
import './assets/style.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './App';
import { theme } from './assets/theme';
import reportWebVitals from './reportWebVitals';

// const history = createBrowserHistory();
// export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// export default store;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
