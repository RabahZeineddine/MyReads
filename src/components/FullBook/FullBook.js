import React , { Component } from 'react'
import PropTypes from 'prop-types'
import  * as BooksAPI from '../../utils/BooksAPI'
import Book from "../Book";

class FullBook extends Component {

    static propTypes = {
        bookId: PropTypes.string.isRequired
    }

    state = {
        book: {}
    }

    componentDidMount(){

        if(this.props.bookId)
            BooksAPI.get(this.props.bookId).then((book) => {
                this.setState({book})
            })

    }

    render(){
        return (
            <Book book={this.state.book} />
        )
    }

}

export default FullBook