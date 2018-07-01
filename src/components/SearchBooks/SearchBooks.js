import React, { Component } from 'react'
import * as BooksAPI from '../../utils/BooksAPI';
import PropTypes from 'prop-types'
import Book from '../Book'
import escapeRegExp from 'escape-string-regexp'
import {DebounceInput} from 'react-debounce-input'
import './SearchBooks.css'


class SearchBooks extends  Component {

    static propTypes = {
        onShelfChange: PropTypes.func.isRequired,
        userBooks: PropTypes.array.isRequired,
        userLoggedIn: PropTypes.bool.isRequired
    }


    state = {
        query: '',
        foundBooks:[]
    }


    handleQuery = (query) => {
        if(query !== ''){
            query = query.replace(new RegExp(/\./,'g'),'')
            query = escapeRegExp(query,'i')
            BooksAPI.search(query).then(( result ) => {
                if(result && !result.hasOwnProperty("error")){
                    this.setState({ query, foundBooks: result})
                }else{
                    this.setState({ query, foundBooks: []})
                }
            })
        }else{
            this.setState({query: '', foundBooks:[]})
        }
    }

    render(){
        return (
            <div className="search-books">
                <div className="search-bar">
                    <DebounceInput
                        type="text"
                        className="search-input"
                        placeholder="Search by title or author"
                        minLength={0}
                        debounceTimeout={300}
                        onChange={ (e) =>  this.handleQuery(e.target.value.trim())}
                    />
                </div>
                <div className="search-result">
                    {(this.state.foundBooks.length > 0 && this.state.query !== '' )?(
                        this.state.foundBooks.map( book => {
                            let userBook = this.props.userBooks.filter( userBook => userBook.id === book.id )[0] || null
                            book.shelf = (userBook)? userBook.shelf: 'none'
                            return ( <Book book={book}  onShelfChange={this.props.onShelfChange} key={book.id} userLoggedIn={this.props.userLoggedIn} /> )
                        })
                    ): (this.state.foundBooks.length === 0 && this.state.query !== '')? (
                        <div>No book found</div>
                    ): '' }
                </div>
            </div>
        )
    }

}

export default SearchBooks