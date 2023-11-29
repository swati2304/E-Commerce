import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import Home from './views/Home/home';
import Signup from './views/Signup/signup';
import Login from './views/Login/login';
import Buy from './views/Buy/buy';
import MyOrders from './views/MyOrders/MyOrders';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
  "path":"/",
  "element": <Home/>
  },
  {
    "path":"/signup",
    "element": <Signup/>,
  },
  {
    "path": "/login",
    "element": <Login/>
  },
  {
    "path": "/buy/:id",
    "element":<Buy/>
  },
  {
    "path":"/MyOrders",
    "element": <MyOrders/>
  }
]);
root.render(<RouterProvider router={router}/>);
