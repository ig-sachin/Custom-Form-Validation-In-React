import React, { Component } from 'react';
import './App.css';

const emailRegax = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
const formValid = formErrors => {
  let valid = true;
  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));
  return valid;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      formErrors: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      }
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state.formErrors)) {
      console.log(`
        ---Submitting---
        First Name: ${this.state.firstname}
        Last Name: ${this.state.Lastname}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("Form Invalid - Display Error Message");
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    console.log("Name: ", name);
    console.log("Value: ", value);
    switch (name) {
      case 'firstname':
        formErrors.firstname = value.length < 3 && value.length > 0 ? 'Yoo dude stop! You need Minimum 3 Chracters for Firstname' : "";
        break;
      case 'lastname':
        formErrors.lastname = value.length < 3 && value.length > 0 ? 'Try to make your lastname 3 Characters long' : "";
        break;
      case 'email':
        formErrors.email = emailRegax.test(value) && value.length > 0 ? '' : 'This is Invalid Email Address Dude';
        break;
      case 'password':
        formErrors.password = value.length < 8 && value.length > 0 ? 'Make you Password Minimum 8 Chracters for a good safty' : "";
        break;
      default:
        return;


    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state))
  }
  render() {
    const { formErrors } = this.state;
    return <div className="app">
      <div className="color" />
      <div className="color" />
      <div className="color" />
      <div className="color" />
      <div className="form_wrapper">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <h1>Create Account</h1>

        <form className="main_form" onSubmit={this.handleSubmit} noValidate>
          <div className="inputBox">
            <input className={formErrors.firstname.length > 0 ? "error" : null} name="firstname" type="text" placeholder="First-Name" onChange={this.handleChange} />
            {formErrors.firstname.length > 0 && (
              <span className="errmsg">{formErrors.firstname}</span>
            )}
          </div>
          <div className="inputBox">
            <input className={formErrors.lastname.length > 0 ? "error" : null} name="lastname" type="text" placeholder="Last-Name" onChange={this.handleChange} />
            {formErrors.lastname.length > 0 && (
              <span className="errmsg">{formErrors.lastname}</span>
            )}
          </div>
          <div className="inputBox">
            <input className={formErrors.email.length > 0 ? "error" : null} name="email" type="text" placeholder="Email" onChange={this.handleChange} />
            {formErrors.email.length > 0 && (
              <span className="errmsg">{formErrors.email}</span>
            )}
          </div>
          <div className="inputBox">
            <input className={formErrors.password.length > 0 ? "error" : null} name="password" type="text" placeholder="Password" onChange={this.handleChange} />
            {formErrors.password.length > 0 && (
              <span className="errmsg">{formErrors.password}</span>
            )}
          </div>
          <div className="inputBox">
            <input name="submit" type="submit" value="Submit" />
          </div>
          <p className="already">Already Have an Account ?
            <a href="www.google.com"> Sign In</a>
          </p>
        </form>
      </div>
    </div>
  }
}



export default App;
