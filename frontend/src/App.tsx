import './App.css';
import { Head } from './components/head/Head';
import { Login } from './components/login/Login';
import { Foot } from './components/foot/Foot';

export default function App() {
  return (
    <div className="app">
      <div className='appHead'>
        <Head />
      </div>
      <div className='appBody'>
        <Login />
      </div>
      <div className='appFoot'>
        <Foot />
      </div>
    </div>
  );
}
