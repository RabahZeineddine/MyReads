import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'
import { getServerMessage } from "../../utils/util";
import * as UserAPI from '../../utils/UserAPI'
import loadingBtn from '../../icons/loading-btn.gif'
import MD5 from 'md5'

import './Login.css'

class Login extends Component {

    static propTypes = {
        onUserLogin: PropTypes.func.isRequired
    }

    state = {
        inputErrors: {
            emailError: false,
            passwordError: false,
        },
        loginError:{
            error: false
        },
        loadingBtn: false

    }



    handleSubmit = (e) => {
        this.setState({ loadingBtn: true })
        e.preventDefault()
        let inputErrors = this.state.inputErrors
        const values = serializeForm(e.target, {hash: true})

        if (!values.email) {
            inputErrors.emailError = true
            inputErrors.emailMsg = "Email is required"
        }
        if (!values.password) {
            inputErrors.passwordError = true
            inputErrors.passwordMsg = "Password is required"
        }

        if (inputErrors.emailError || inputErrors.passwordError) {
            this.setState({inputErrors , loadingBtn:false})
        }else{
            /* Login */
            this.setState({loginError: {error: false}})
            values.password = MD5(values.password)
            UserAPI.login(values).then( res => {
                if(res.error){
                    res.errorMsg =getServerMessage(res.errorMsg)
                    this.setState({ loginError: res , loadingBtn: false })
                }else{
                    let user = res.user
                    delete res.user
                    this.props.onUserLogin(user)
                }
            }).catch((err)=>{
                console.log(err)
                this.setState({loadingBtn:false, loginError: {error: true ,errorMsg: getServerMessage(err)}})
            })

        }
    }

    handleInputChange = (e) =>{
        let inputErrors = this.state.inputErrors
        if(e.target.name === "email") {
            inputErrors.emailError = false
            delete inputErrors.emailMsg
        }else{
            inputErrors.passwordError= false
            delete inputErrors.passwordMsg
        }

        this.setState({inputErrors})

    }

    render(){
        return (
            <div className="login-content">
                <form className="login-form" onSubmit={this.handleSubmit} action="#">
                    <p className="login-alert">{ (this.state.loginError.error)?this.state.loginError.errorMsg:'' }</p>
                    <div className="form-item">
                        <input
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            autoComplete="off"
                            className={ (this.state.inputErrors.emailError)?'invalid':''}
                            onChange={(e) => this.handleInputChange(e)}
                        />
                        <p className="helper-error">{this.state.inputErrors.emailMsg || '' }</p>
                    </div>
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
                        <button type="submit"  className={this.state.loadingBtn? 'loading-btn':'login-form-btn'} >{this.state.loadingBtn ? <img src={loadingBtn} alt="loading"/>:'Login'}</button>
                    </div>
                </form>
            </div>
        )
    }

}

export default Login