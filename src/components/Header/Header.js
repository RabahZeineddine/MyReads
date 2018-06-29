import React, {Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {

    render(){
        return (
            <div className="header">
                <div className="header-top">
                    <h2 className="header-title">MyReads</h2>
                </div>
                <div className="header-navbar">
                    <div className="navbar-line"></div>
                    <div className="navbar-content">
                        <div className="navbar-left">
                            <Link className="navbar-item" to="/">Home</Link>
                            <Link className="navbar-item" to="/search">Find books</Link>
                        </div>
                        <div className="navbar-right">
                            <Link className="navbar-item" to="/login">Login</Link>
                            <Link className="navbar-item" to="/signup">Signup</Link>
                        </div>
                    </div>
                    <div className="navbar-line"></div>
                </div>
            </div>
        )
    }

}
export default  Header