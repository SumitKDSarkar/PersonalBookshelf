import React, { useState, useEffect } from 'react';
import '../Components/Styles/BookShelfPage.css';

function BookShelfPage() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div className="bookshelf-container">
      <h1 className="bookshelf-heading">My Bookshelf</h1>
      <div className="book-grid">
        {bookshelf.map((book) => (
          <div key={book.key} className="book-item">
            <h1 className="book-title">Book Title: {book.title}</h1>
            <h2 className="edition-count">Edition_Count: {book.edition_count}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookShelfPage;
