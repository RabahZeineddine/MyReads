import React, { Component } from 'react';
import Header from './Header'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import Footer from './Footer'
import Login from './Login'
import * as Util from '../utils/util'
import * as BooksAPI from '../utils/BooksAPI'
import {Route} from 'react-router-dom'
import './App.css';
import Signup from "./Signup";
import FullBook from "./FullBook";

class App extends Component {

    state = {
        books: [],
        user:{},
        userLoggedIn: false,
        loadingBooks: false,
        error: false
    }

    componentDidMount(){

        if(Util.sessionCheck('user')){
            this.setState({ userLoggedIn: true, user: Util.getSession('user') , loadingBooks: true})
            BooksAPI.getAll().then( books => {
                this.setState({books , loadingBooks:false })
            }).catch( (err) => {
                this.setState({error: true })
            })
        }

    }

    handleUserLogin = (user) => {
        Util.setSession('user', user)
        this.setState({userLoggedIn: true, user,  loadingBooks: true})

        BooksAPI.getAll().then( books => {
            this.setState({books ,  loadingBooks: false})
        }).catch((err) => {
            this.setState({error: true})
        })
    }

    handleUserLogout = () => {
        Util.deleteSession('user')
        this.setState({ user: {}, userLoggedIn: false})
    }

    handleUserSignup = (user) => {
        this.handleUserLogin(user)
    }


    handleShelfChange = (changedBook, shelf) => {
        let books = this.state.books
        if(shelf === 'none') books = books.filter( book => book.id !== changedBook.id)
        else{
            let selectedBook = books.filter( book => book.id === changedBook.id)[0] || null
            if(!selectedBook) books = books.concat(changedBook)
            books = books.map( book => {
                if(book.id === changedBook.id) book.shelf = shelf
                return book
            })
        }
        BooksAPI.update(changedBook,shelf).then((res) => {
            this.setState({ books })
        }).catch((err) => {
            this.setState({error: true})
        })
    }

    render() {
        return (
            <div className="App">
                <Header logout={this.handleUserLogout} user={this.state.user} userLoggedIn={this.state.userLoggedIn} />
                <Route exact path="/" render={ () => (
                    <ListBooks
                        books={ this.state.books }
                        onShelfChange={this.handleShelfChange}
                        userLoggedIn={this.state.userLoggedIn}
                        loadingBooks={this.state.loadingBooks}
                        error={this.state.error}
                    />
                )} />

                <Route exact path="/search" render={ () => (
                    <SearchBooks
                        onShelfChange={this.handleShelfChange}
                        userBooks={this.state.books}
                        userLoggedIn={this.state.userLoggedIn}
                    />
                )} />

                <Route exact path="/login" render={ ({history}) => (
                    <Login onUserLogin={(user) => {
                        this.handleUserLogin(user)
                        history.push('/')
                    }} />
                )} />

                <Route exact path="/signup" render={ ({history}) => (
                    <Signup onUserSignup={ (user) => {
                        this.handleUserSignup(user)
                        history.push('/')
                    }}/>
                )} />

                <Route path="/books/:id" render={(props) => (
                    <FullBook bookId={props.match.params.id} />
                )}/>

                <Footer />
            </div>
        );
    }

}

export default App;
