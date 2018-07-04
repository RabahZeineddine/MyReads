import React, { Component } from 'react'
import './Footer.css'


class Footer extends Component{

    render(){
        return (
            <div className="footer">
                <div className="footer-top show-on-large-screen">
                    <div className="footer-line"></div>
                    <div className="footer-title">ABOUT</div>
                    <div className="footer-line"></div>
                    <div className="footer-line"></div>
                    <div className="footer-title">CONTACT</div>
                    <div className="footer-line"></div>
                    <div className="footer-line"></div>
                    <div className="footer-title">SOCIAL</div>
                    <div className="footer-line"></div>
                </div>
                <div className="footer-content">
                    <div className="mobile-footer-title">
                        <div className="footer-line"></div>
                        <div className="footer-title">ABOUT</div>
                        <div className="footer-line"></div>
                    </div>
                    <div className="about-footer">
                        <p>MyReads: A book tracking app that helps you categorize your books and find new ones. Based on React Nanodegree Program.</p>
                    </div>
                    <div className="mobile-footer-title">
                        <div className="footer-line"></div>
                        <div className="footer-title">CONTACT</div>
                        <div className="footer-line"></div>
                    </div>
                    <div className="contact-footer">
                        <div className="link-item">
                            <div className="footer-icon linkedin-icon"></div>
                            <a href="https://www.linkedin.com/in/rabahzeineddine" rel="noopener noreferrer" target="_blank" className="footer-link">Rabah Zeineddine</a>
                        </div>
                        <div className="link-item">
                            <div className="footer-icon mail-icon"></div>
                            <a href="mailto:rabah.zeineddine@gmail.com" target="_blank" rel="noopener noreferrer" className="footer-link">rabah.zeineddine@gmail.com</a>
                        </div>
                    </div>
                    <div className="mobile-footer-title">
                        <div className="footer-line"></div>
                        <div className="footer-title">SOCIAL</div>
                        <div className="footer-line"></div>
                    </div>
                    <div className="social-footer">
                        <div className="link-item">
                            <div className="footer-icon facebook-icon"></div>
                            <a href="https://www.facebook.com/rabah.zeineldine.9" target="_blank" rel="noopener noreferrer" className="footer-link">Rabah Zeineddine</a>
                        </div>
                        <div className="link-item">
                            <div className="footer-icon instagram-icon"></div>
                            <a href="https://www.instagram.com/rabahzeineddine/" target="_blank" rel="noopener noreferrer" className="footer-link">rabahzeineddine</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Footer