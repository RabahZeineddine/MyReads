import React, { Component } from 'react'
import './SearchBooks.css'


class SearchBooks extends  Component {

    render(){
        return (
            <div className="search-books">
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by title or author" />
                </div>
                <div className="search-result"></div>
            </div>
        )
    }

}

export default SearchBooks