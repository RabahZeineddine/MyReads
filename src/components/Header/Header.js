import React, {Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Header.css'

class Header extends Component {

    static propTypes ={
        logout: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        userLoggedIn: PropTypes.bool.isRequired
    }

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
                        { this.props.userLoggedIn? (
                                <div className="navbar-right">
                                    <p className="navbar-item-text">Welcome, {this.props.user.name}</p>
                                    <a className="navbar-item" onClick={this.props.logout}> Logout</a>
                                </div>):
                            (
                                <div className="navbar-right">
                                    <Link className="navbar-item" to="/login">Login</Link>
                                    <Link className="navbar-item" to="/signup">Signup</Link>
                                </div>
                            )}

                    </div>
                    <div className="navbar-line"></div>
                </div>
            </div>
        )
    }

}
export default  Header