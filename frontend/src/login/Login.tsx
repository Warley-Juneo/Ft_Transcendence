import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { AuthLogin } from './AuthLogin';

export function Login() {
    return (
        <div className="template">
          <div className="title">
            <h1>FT_TRANSCENDENCE</h1>
          </div>
          <div className="form_container">
            <form>
              <h3 className="text-center">Sign in</h3>
              <div className="mb-2">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="login_email"
                >
                <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
              </div>
              <div className="mb-2">
                <FloatingLabel 
                  controlId="floatingPassword"
                  label="Password"
                  className="login_password"
                >
                <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
              </div>
              <div className='mb-2'>
                <input type="checkbox" className='custom-control custom-checkbox' id='check'/>
                <label htmlFor="check" className="custom-input-label ms-2">
                  Remember me
                </label>
              </div>
              <div className="d-grid">
                <button onClick={AuthLogin}>Sign in</button>
              </div>
              {/* <p className="text-end mt-2">
                Forgot <a href=""> Password?</a><a href="" className="ms-2">Sign up</a>
              </p> */}
            </form>
          </div>
        </div>
    );
}
