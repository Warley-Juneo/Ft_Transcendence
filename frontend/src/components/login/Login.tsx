import { useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { AuthLogin } from './authLogin';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Login() {

  //ACCESS BACKEND AFTER GET THE CODE AT API42
  async function axios_connect(): Promise<any> {
    let paramters = new URLSearchParams(window.location.search);
    let code = paramters.get('code');
    if (code) {
      var response = await axios.post('http://localhost:3000/auth', {
        authCode: code,
      })
      .then((response)=> {
        console.log(response);
        if (response.status === 201) {
          console.log('RENDERIZAR A PÀGINA DO GAME');
        }
        else {
          console.log("RENDERIZAR PAGINA LOGIN INFORMANDO O ERRO");
        }
      })
    }
    return response;
  }

  //THIS FUNCTION IS EXECUTED EVERY TIME THE PAGE IS LOADED
  useEffect(() => {
    axios_connect();
  }, []);

  return (
        <div className="login  ">
          {/* <img src={anime} /> */}
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
              <p className="text-end mt-2">
                Forgot <a href=""> Password?</a><Link to="/signup" className="ms-2">Sign up</Link>
              </p>

            </form>
          </div>
        </div>
    );
}
