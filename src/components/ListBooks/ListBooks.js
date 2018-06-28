import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from '../Book'
import './ListBooks.css'

class ListBooks extends Component {


    static propTypes = {
        books: PropTypes.array.isRequired
    }


    render(){

        /* As it is not guaranteed the books order got from BooksAPI, filtering it to show it properly */

        const currentlyReadingBooks =  this.props.books.filter( (book) => book.shelf === 'currentlyReading')
        const wantToReadBooks =  this.props.books.filter( (book) => book.shelf === 'wantToRead')
        const readBooks =  this.props.books.filter( (book) => book.shelf === 'read')

        return (
            <div className="list-books">

                <div className="bookshelf">
                    <div className="bookshelf-header">
                        <div className="left-line"></div>
                        <div className="bookshelf-title"> Currently Reading</div>
                        <div className="right-line"></div>
                    </div>
                    <div className="bookshelf-books">
                        {currentlyReadingBooks.map( book => (
                            <Book book={book} key={book.id} />
                        ))}
                    </div>
                </div>
                <div className="bookshelf">
                    <div className="bookshelf-header">
                        <div className="left-line"></div>
                        <div className="bookshelf-title"> Want to Read</div>
                        <div className="right-line"></div>
                    </div>
                    <div className="bookshelf-books">
                        {wantToReadBooks.map( book => (
                            <Book book={book} key={book.id} />
                        ))}
                    </div>
                </div>

                <div className="bookshelf">
                    <div className="bookshelf-header">
                        <div className="left-line"></div>
                        <div className="bookshelf-title"> Read</div>
                        <div className="right-line"></div>
                    </div>
                    <div className="bookshelf-books">
                        {readBooks.map( book => (
                            <Book book={book} key={book.id} />
                        ))}
                    </div>
                </div>


            </div>
        )
    }

}

export default  ListBooks