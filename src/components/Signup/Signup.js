import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'
import { getServerMessage } from "../../utils/util";
import * as UserAPI from '../../utils/UserAPI'

import './Signup.css'

class Signup extends Component {

    static propTypes = {
        onUserSignup: PropTypes.func.isRequired
    }

    state = {
        inputErrors: {
            firstnameError: false,
            lastnameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false
        },
        signupError:{
            error: false
        }

    }

    handleSubmit = (e) => {
        e.preventDefault()
        let inputErrors = this.state.inputErrors
        const values = serializeForm(e.target, {hash: true})
        let valid = true

        if(!values.firstname){
            inputErrors.firstnameError = true
            inputErrors.firstnameMsg = "Firstname is required"
            valid = false
        }

        if(!values.lastname){
            inputErrors.lastnameError = true
            inputErrors.lastnameMsg = "Lastname is required"
            valid = false
        }


        if (!values.email) {
            inputErrors.emailError = true
            inputErrors.emailMsg = "Email is required"
            valid = false
        }

        if (!values.password) {
            inputErrors.passwordError = true
            inputErrors.passwordMsg = "Password is required"
            valid = false
        }

        if(!values.confirmPassword){
            inputErrors.confirmPasswordError = true
            inputErrors.confirmPasswordMsg = "Confirm password is required"
            valid = false
        }

        if(valid){
            if(values.password !== values.confirmPassword ) {
                inputErrors.passwordError = true
                inputErrors.confirmPasswordError = true
                inputErrors.passwordMsg = "Passwords don't match"
                inputErrors.confirmPasswordMsg = "Passwords don't match"
                valid = false
            }
        }




        if (!valid) {
            this.setState({inputErrors})
        }else{
            /* Signuo */
            UserAPI.signup(values).then( res => {
                if(res.error){
                    res.errorMsg = getServerMessage(res.errorMsg)
                    this.setState({ signupError: res })
                }else{
                    let user = res.user
                    delete res.user
                    this.props.onUserSignup(user)
                }
            })
        }
    }

    handleInputChange = (e) =>{
        let inputErrors = this.state.inputErrors

        if(e.target.name === "firstname"){
            inputErrors.firstnameError = false
            delete inputErrors.firstnameMsg
        }else if( e.target.name === "lastname"){
            inputErrors.lastnameError = false
            delete inputErrors.lastnameMsg
        }else if(e.target.name === "email") {
            inputErrors.emailError = false
            delete inputErrors.emailMsg
        }else if(e.target.name === "password"){
            inputErrors.passwordError = false
            delete inputErrors.passwordMsg
        }else if(e.target.name === "confirmPassword" ){
            inputErrors.confirmPasswordError = false
            delete inputErrors.confirmPasswordMsg

            if(inputErrors.passwordError){
                inputErrors.passwordError = false
                delete inputErrors.passwordMsg
            }

        }

        this.setState({inputErrors})

    }

    render(){
        return (
            <div className="signup-content">
                <form className="signup-form" onSubmit={this.handleSubmit}>
                    <p className="signup-alert">{ (this.state.signupError.error)?this.state.signupError.errorMsg:'' }</p>
                    <div className="row">
                        <div className="form-item">
                            <input
                                type="text"
                                placeholder="Firstname"
                                name="firstname"
                                autoComplete="off"
                                className={ (this.state.inputErrors.firstnameError)?'invalid':''}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                            <p className="helper-error">{this.state.inputErrors.firstnameMsg || '' }</p>
                        </div>
                        <div className="form-item">
                            <input
                                type="text"
                                placeholder="Lastname"
                                name="lastname"
                                autoComplete="off"
                                className={ (this.state.inputErrors.lastnameError)?'invalid':''}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                            <p className="helper-error">{this.state.inputErrors.lastnameMsg || '' }</p>
                        </div>
                    </div>
                    <div className="form-item">
                        <input
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            className={(this.state.inputErrors.emailError)?'invalid':''}
                            onChange={(e) => this.handleInputChange(e)}
                        />
                        <p className="helper-error">{this.state.inputErrors.emailMsg || ''}</p>
                    </div>
                    <div className="row">
                        <div className="form-item">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className={(this.state.inputErrors.passwordError)?'invalid':''}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                            <p className="helper-error">{this.state.inputErrors.passwordMsg || ''}</p>
                        </div>
                        <div className="form-item">
                            <input
                                type="password"
                                placeholder="Confirm password"
                                name="confirmPassword"
                                className={(this.state.inputErrors.confirmPasswordError)?'invalid':''}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                            <p className="helper-error">{this.state.inputErrors.confirmPasswordMsg || ''}</p>
                        </div>
                    </div>
                    <div className="form-item">
                        <button type="submit"  className="signup-form-btn" >Signup</button>
                    </div>
                </form>
            </div>
        )
    }

}

export default Signup