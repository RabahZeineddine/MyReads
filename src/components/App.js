import React, { Component } from 'react';
import Header from './Header'
import ListBooks from './ListBooks'
import * as BooksAPI from '../utils/BooksAPI'
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

    render() {
        return (
            <div className="App">
                <Header />
                <ListBooks books={ this.state.books } />
            </div>
        );
    }

}

export default App;
