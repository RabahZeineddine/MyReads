import React, { Component } from 'react'
import './ListBooks.css'

class ListBooks extends Component {

    render(){

        return (
            <div className="list-books">

                <div className="bookshelf">
                    <div className="bookshelf-header">
                        <div className="left-line"></div>
                        <div className="bookshelf-title"> Currently Reading</div>
                        <div className="right-line"></div>
                    </div>
                    <div className="bookshelf-books">

                    </div>
                </div>


            </div>
        )
    }

}

export default  ListBooks