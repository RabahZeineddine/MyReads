import React, { Component } from 'react';
import Header from './Header'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from '../utils/BooksAPI'
import {Route} from 'react-router-dom'
import './App.css';

class App extends Component {

    state = {
        books: []
    }

    componentDidMount(){
        BooksAPI.getAll().then( books => {
            this.setState({books})
        })
    }

    handleShelfChange = (changedBook, shelf) => {
        let books = this.state.books
        if(shelf === 'none') books = books.filter( book => book.id !== changedBook.id)
        else{
            books = books.map( book => {
                if(book.id === changedBook.id) book.shelf = shelf
                return book
            })
        }

        BooksAPI.update(changedBook,shelf).then((res) => {
            /* TODO: filter local books comparing it with res returned from BooksAPI.update() */
            this.setState({ books })
        })
    }

    render() {
        return (
            <div className="App">
                <Header />
                <Route exact path="/" render={ () => (
                    <ListBooks books={ this.state.books } onShelfChange={this.handleShelfChange} />
                )} />

                <Route exact path="/search" render={ () => (
                    <SearchBooks onShelfChange={this.handleShelfChange} />
                )} />

            </div>
        );
    }

}

export default App;
