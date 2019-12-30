import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './components/home-page/Home';
import Login from './components/login-page/Login';
import RegisterPage from './components/register-page/RegisterPage';
import AddProducts from './components/add-products-page/AddProducts';
import ShowProductsPage from './components/show-products-page/ShowProductsPage'
import WishListPage from './components/wishlist-page/WishListPage';
import CartPage from './components/cart-page/CartPage';



function App() {
  return (
    <>
      <Router>
        <nav class="navbar navbar-expand-lg navbar-dark bg-info">
        <Link to='/' class='navbar-brand'>Shopping</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">
              
              <li class="nav-item active ml-2">
               <Link to='/addProducts' class='nav-link'>Add Products</Link>
              </li>
              <li class="nav-item active ml-2">
               <Link to='/showProducts' class='nav-link'>Products</Link>
              </li>
              <li class="nav-item active ml-2">
               <Link to='/wishlist' class='nav-link'>My Wishlist</Link>
              </li>
              <li class="nav-item active ml-2">
               <Link to='/cart' class='nav-link'>My Cart</Link>
              </li>
            </ul>
            <ul class="navbar-nav navbar-right">
            <li class="nav-item active ml-2">
               <Link to='/login' class='nav-link'>Login</Link>
              </li>
              <li class="nav-item active ml-2">
               <Link to='/register' class='nav-link'>Register</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Route exact path ='/' component={Home}/>
        <Route exact path ='/login' component={Login}/>
        <Route exact path ='/register' component={RegisterPage}/>
        <Route exact path ='/addProducts' component={AddProducts}/>
        <Route exact path ='/showProducts' component={ShowProductsPage}/>
        <Route exact path ='/wishlist' component={WishListPage}/>
        <Route exact path ='/cart' component={CartPage}/>
      </Router>
    </>
  );
}
export default App;
