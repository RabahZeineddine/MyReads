import React, { Component } from 'react'
import * as BooksAPI from '../../utils/BooksAPI';
import PropTypes from 'prop-types'
import Book from '../Book'
import escapeRegExp from 'escape-string-regexp'
import {DebounceInput} from 'react-debounce-input'
import './SearchBooks.css'


class SearchBooks extends  Component {

    static propTypes = {
        onShelfChange: PropTypes.func.isRequired
    }


    state = {
        query: '',
        foundBooks:[]
    }


    handleQuery = (query) => {
        if(query !== ''){
            query = query.replace(new RegExp(/\./,'g'),'')
            query = escapeRegExp(query,'i')
            console.log(query)
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
                        this.state.foundBooks.map( book => (
                            <Book book={book} key={book.id} onShelfChange={this.props.onShelfChange} />
                        ))
                    ): (this.state.foundBooks.length === 0 && this.state.query !== '')? (
                        <div>No book found</div>
                    ): '' }
                </div>
            </div>
        )
    }

}

export default SearchBooks