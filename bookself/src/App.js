import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './Components/SearchPage';
import BookShelfPage from './Components/BookSelfPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/bookshelf" element={<BookShelfPage />} />
      </Routes>
    </Router>
  );
}

export default App;
