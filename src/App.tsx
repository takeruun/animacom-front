import { FC } from 'react';
import './App.css';
import Router from 'Router';
import Header from 'components/header/Header';
import { CustomizedSnackbar } from 'components/contents/snackbar/CustomizedSnackbar';

const App: FC = () => (
  <>
    <Header />
    <main className="c-main">
      <CustomizedSnackbar />
      <Router />
    </main>
  </>
);

export default App;
