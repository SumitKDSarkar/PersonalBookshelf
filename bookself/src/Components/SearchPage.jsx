import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Styles/SearchPage.css";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchInitialResults = async () => {
    setIsSearching(true);
    const defaultQuery = "india";
    const apiUrl = `https://openlibrary.org/search.json?q=${defaultQuery}&limit=10&page=1`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setSearchResults(data.docs);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchInitialResults();
  }, []);

  const handleSearch = async () => {
    if (searchQuery) {
      setIsSearching(true);
      const apiUrl = `https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setSearchResults(data.docs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const addItemToBookshelf = (book) => {
    const currentBookshelf =
      JSON.parse(localStorage.getItem("bookshelf")) || [];

    const isBookInBookshelf = currentBookshelf.some(
      (item) => item.key === book.key
    );

    if (!isBookInBookshelf) {
      currentBookshelf.push(book);

      localStorage.setItem("bookshelf", JSON.stringify(currentBookshelf));

      console.log("Added to Bookshelf:", book.title);
    } else {
      console.log("Book already in Bookshelf:", book.title);
    }
  };

  return (
    <div className="search-page">
      <div className="search-page-header">
        <h1>Book Search Page</h1>
      </div>

      <div className="navigate-button">
        <Link to="/bookshelf">
          <button className="button">Go to Book Shelf</button>
        </Link>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a book"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearchButtonClick}>Search</button>
        
      </div>
      {isSearching && <p>Searching...</p>}
      <div className="search-results">
        {searchResults.map((book) => (
          <div key={book.key} className="search-result-item">
            <h2>Book Title : {book.title}</h2>
            <h2>Edition Count : {book.edition_count}</h2>
            <button onClick={() => addItemToBookshelf(book)}>
              Add to Bookshelf
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
