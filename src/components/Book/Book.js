import React, { Component } from 'react'
import PropTypes from 'prop-types'
import defaultCoverImage from '../../imgs/default_cover.png'
import './Book.css'

class Book extends Component {

    state = {
        showOptions: false
    }

    static propTypes = {
        book: PropTypes.object.isRequired
    }

    showBookOptions = () => {
        this.setState({ showOptions: true})
    }

    hideBookOptions = () => {
        this.setState({ showOptions: false})
    }

    render(){

        const book = this.props.book

        /* treat book shelf when it doesn't exist */
        book.shelf = (book.shelf)? book.shelf:'none'

        return (
            <div className="book">
                <div className="book-top">
                    { book.hasOwnProperty('imageLinks')? (
                        <div className="book-cover" style={{ backgroundImage: `url("${book.imageLinks.smallThumbnail}")`}}></div>
                    ):(
                        <div className="book-cover" style={{ backgroundImage: `url(${defaultCoverImage})`}}></div>
                    )}
                    <div className={`book-options ${this.state.showOptions ? "show-options":"hide-options"}` }>
                        <div className="book-options-header">
                            <h4>Move to..</h4>
                            <button className="book-options-btn" onClick={ () => this.hideBookOptions()} ><i className="material-icons">close</i></button>
                        </div>
                        <div className="book-options-content">
                            <button className={`book-option-btn ${ (book.shelf === 'currentlyReading')? 'book-option-btn-clicked': ''}`} >Currently Reading</button>
                            <hr className="divider"/>
                            <button className={`book-option-btn ${ (book.shelf === 'wantToRead')? 'book-option-btn-clicked': ''}`} >Want to Read</button>
                            <hr className="divider"/>
                            <button className={`book-option-btn ${ (book.shelf === 'read')? 'book-option-btn-clicked': ''}`} >Read</button>
                            <hr className="divider"/>
                            <button className={`book-option-btn ${ (book.shelf === 'none')? 'book-option-btn-clicked': ''}`} >None</button>
                        </div>
                    </div>
                </div>
                <div className="book-footer">
                    <div className="book-footer-header">
                        <div className="book-title truncate">{book.title}</div>
                        <button className="book-options-btn" onClick={ () => this.showBookOptions()} ><i className="material-icons">more_vert</i></button>
                    </div>
                    <div className="book-authors">{  (book.authors && book.authors.length>0) ? book.authors.join(' , '): ''}</div>
                </div>
            </div>
        )
    }
}

export default Book