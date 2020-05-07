import React from 'react';
import NewsPage from './pages/NewsPage';
import { Route } from 'react-router-dom';

const App = () => {
  return <Route path="/:category?" component={NewsPage} />; //path값에 준 category값은 선택적 이라는 의미.
};

export default App;
