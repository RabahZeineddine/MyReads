import React , { Component } from 'react'
import PropTypes from 'prop-types'
import  * as BooksAPI from '../../utils/BooksAPI'
import defaultCoverImage from '../../imgs/default_cover1.png'
import './FullBook.css'


class FullBook extends Component {

    static propTypes = {
        bookId: PropTypes.string.isRequired
    }

    state = {
        book: {},
        loadingBook: false,
        error: false
    }

    componentDidMount(){
        this.setState({loadingBook: true})
        if(this.props.bookId)
            BooksAPI.get(this.props.bookId).then((book) => {
                this.setState({book, loadingBook: false})
            }).catch((err) => {
                this.setState({error: true})
            })
    }

    render(){
        const book = this.state.book
        return (
            (this.state.error)? <div className="loading-error">An error occurred, try again later.</div>:
            (this.state.loadingBook )? <div className="loading-div"></div>:
                ( Object.keys(book).length> 0 )?(
                    <div className="fullbook-content">
                        <div className="fullbook-image-container">
                            { book.hasOwnProperty('imageLinks')? (
                                <img className="fullbook-cover" src={book.imageLinks.thumbnail} alt={book.title} />
                            ):(
                                <img className="fullbook-cover" src={defaultCoverImage} alt={book.title} />
                            )}
                        </div>
                        <div className="fullbook-details-container">
                            <h2 className="fullbook-title">{book.title? book.title: 'No title available'}</h2>
                            { book.subtitle && (
                                <h4 className="fullbook-subtitle">{book.subtitle}</h4>
                            )}
                            { book.authors && book.authors.length >0 && (
                                <h5 className="fullbook-authors">{book.authors.join(' | ')}</h5>
                            )}

                            { book.publisher && (
                                <p className="fullbook-detail-p"><span className="bold">PUBLISHER: </span>{book.publisher}</p>
                            )}

                            {book.publishedDate && (
                                <p className="fullbook-detail-p"><span className="bold">PUBLISH DATE: </span>{book.publishedDate}</p>
                            )}

                            {book.description && (
                                <div>
                                    <p className="bold">DESCRIPTION:</p>
                                    <p className="fullbook-detail-p fullbook-description">{book.description}</p>
                                </div>
                            )}

                            { book.categories && (
                                <p className="fullbook-detail-p"><span className="bold">{ book.categories.length === 1?'CATEGORY':'CATEGORIES'}: </span>{book.categories.join(' ,  ')}</p>
                            )}

                            { book.pageCount && (
                                <p className="fullbook-detail-p"><span className="bold">PAGES: </span>{book.pageCount}</p>
                            )}

                            { book.industryIdentifiers && (
                                <p className="fullbook-detail-p">
                                    <span className="bold">ISBN: </span>
                                    { book.industryIdentifiers.map( industryIdentifier => industryIdentifier.identifier).join(' , ') }
                                </p>
                            )}

                            { book.averageRating && (
                               <p className="fullbook-detail-p" ><span className="bold">RATING: </span> {book.averageRating}</p>
                            )}

                        </div>
                    </div>
                ):''
        )
    }

}

export default FullBook