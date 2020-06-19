import React from "react";
import Axios from "axios";
import classes from "./Login.module.css";


class LoginPage extends React.Component {

    state = {
        validEmail: true,
        validPwd: true,
        showRegisterMessage : false,
        loginFormShow:true,
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const validEmail = this.state.validEmail;
        const validPwd = this.state.validPwd;
        if(validEmail && validPwd){
            const LoginData = {
                email: e.target.email.value,
                password: e.target.pwd.value,
            }
            this.props.handleLoginPage();
    }else{
        alert("Please Enter valid details")
    }
    }
    handleEmailField = (e) => {
        var fieldEmail = e.target.value;
        var validEmailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        var email = fieldEmail.match(validEmailPattern);
        if (email === null) {
            this.setState({ validEmail: false })
        } else {
            this.setState({ validEmail: true })
        }
    }
    handlePwdField = (e) => {
        var fieldPwd = e.target.value;
        var validPwdPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        var pwd = fieldPwd.match(validPwdPattern);
        if (pwd === null) {
            this.setState({ validPwd: false })
        } else {
            this.setState({ validPwd: true })
        }
    }
    render() {
        return (
            <div className={classes.MainWrapper}>
                        <div className={classes.loginForm} >
                            <div className={classes.loginFormHeading}>
                                <p>Chat App</p>
                                <i className="fas fa-user-lock"></i>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <p>Email Address : </p>
                                    <input type="email" name="email" placeholder="Email Address" required onInput={this.handleEmailField} />
                                    {
                                        this.state.validEmail === true ? null :
                                            <div className={classes.errorMessage}>
                                                <p>Please Enter Valid Email</p>
                                            </div>
                                    }
                                </div>
                                <div>
                                    <p>Password : </p>
                                    <input type="password" name="pwd" placeholder="Password" required onChange={this.handlePwdField} />
                                    {
                                        this.state.validPwd === true ? null :
                                            <div className={classes.errorMessage}>
                                                <p>Minimum eight characters, at least one letter, one number and one special character</p>
                                            </div>
                                    }
                                </div>
                                <div className={classes.loginBtnWrapper}>
                                    <button type="submit" >Welcome</button>
                                </div>
                            </form>
                        </div>
                        
              
            </div>
        )
    }
}

export default LoginPage;