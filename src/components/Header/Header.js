import React, {Component } from 'react'
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
                            <div className="navbar-item">Home</div>
                            <div className="navbar-item">Find books</div>
                        </div>
                        <div className="navbar-right">
                            <div className="navbar-item">Login</div>
                            <div className="navbar-item">Signup</div>
                        </div>
                    </div>
                    <div className="navbar-line"></div>
                </div>
            </div>
        )
    }

}
export default  Header