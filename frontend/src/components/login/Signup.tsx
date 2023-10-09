import React from "react";
import { useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { AuthLogin } from "./authLogin";
import { Head } from '../head/Head';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Signup() {
	return (
		<div className="sign_up">
          <div className="form_container">
            <form>
              <h3 className="text-center">Sign in</h3>
              <div className="mb-2">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Nickname"
                  className="nickname"
                >
                <Form.Control type="string" placeholder="nickname" />
                </FloatingLabel>
              </div>
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
              <p className="text-end mt-2">
                Forgot <a href=""> Password?</a><Link to="/" className="ms-2">Sign in</Link>
              </p>
              
            </form>
          </div>
        </div>
	)
}