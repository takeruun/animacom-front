import { FC } from 'react';
import './App.css';
import Router from 'Router';
import Header from 'components/header/Header';

const App: FC = () => (
  <>
    <Header />
    <Router />
  </>
);

export default App;
