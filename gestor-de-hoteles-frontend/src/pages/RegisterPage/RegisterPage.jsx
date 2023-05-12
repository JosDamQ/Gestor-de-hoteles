import React, {useState, useContext, useEffect} from 'react'
import '../RegisterPage/RegisterStyle.css'

export const RegisterPage = () => {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = 'src/pages/RegisterPage/Register.js';
    script.type = 'text/javascript'
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>

    <div className="main" >
      <div className="container a-container" id="a-container">
        <form className="form" id="a-form">
          <h2 className="form_title title">Create Account</h2>
        
          <input className="form__input" type="text" placeholder="Name"/>
          <input className="form__input" type="text" placeholder="Email"/>
          <input className="form__input" type="password" placeholder="Password"/>
          <button className="button submit">SIGN UP</button>
        </form>
      </div>
      <div className="container b-container" id="b-container">
        <form className="form" id="b-form">
          <h2 className="form_title title">Sign in to Website</h2>
          
          <input className="form__input" type="text" placeholder="Email"/>
          <input className="form__input" type="password" placeholder="Password"/><a className="form__link">Forgot your password?</a>
          <button className="button submit">SIGN IN</button>
        </form>
      </div>
      <div className="switch" id="switch-cnt">
        <div className="switch__circle"></div>
        <div className="switch__circle switch__circle--t"></div>
        <div className="switch__container" id="switch-c1">
          <h2 className="switch__title title">You already have an account?</h2>
          <p className="switch__description description">To keep connected with us please login with your personal info</p>
          <button className="switch__button button switch-btn">SIGN IN</button>
        </div>
        <div className="switch__container is-hidden" id="switch-c2">
          <h2 className="switch__title title">You do not have an account?</h2>
          <p className="switch__description description">Enter your personal details and start journey with us</p>
          <button className="switch__button button switch-btn">SIGN UP</button>
        </div>
      </div>
    </div>
    </>
  )
}