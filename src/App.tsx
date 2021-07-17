import { FC } from 'react';
import './App.css';
import Router from 'Router';
import Header from 'components/header/Header';

const App: FC = () => (
  <>
    <Header />
    <main className="c-main">
      <Router />
    </main>
  </>
);

export default App;
