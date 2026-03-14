
import './App.css'
import Layout from './component/Layout'
import Home from './pages/Home'
import Product from './pages/Product'
import {Navigate, useNavigate, useRoutes} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import Order from './pages/Order'
// for admin 
import AdminProfile from './admin/AdminProfile'
import CategoryList from './admin/CategoryList'
import Categoryform from './admin/Categoryform'
import AdminProductList from './admin/AdminProductList'
import AdminProductForm from './admin/AdminProductForm'
import AdminOrderList from './admin/AdminOrderList'
import AdminOrderDetails from './admin/AdminOrderDetails'
const routes = function(isLoggedIn,role){
    return[
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'product',
          element:<Product/>
        },
         {
          path:'register',
          element:<Register/>
        },
          {
          path:'login',
          element:<Login/>
        },
          {
       path:'profile',
       element:authRoutes(isLoggedIn,role,<Profile/>) 
        },
         {
          path:'cart',
          element:<Cart/>
        },
         {
         path:'checkOut',
         element:(<CheckOut/>) 
        },
        {
          path:'order',
         element:authRoutes(isLoggedIn,role,<Order/>) 
        },
        // for admin
        {
          path:'admin/profile',
          element:checkAdminAuth(isLoggedIn,role,<AdminProfile/>) 
        },
         {
          path:'admin/categories',
          element:checkAdminAuth(isLoggedIn,role,<CategoryList/>) 
        },
        {
          path:'admin/products',
          element:checkAdminAuth(isLoggedIn,role,<AdminProductList/>) 
        },
          {
          path:'admin/orders',
          element:checkAdminAuth(isLoggedIn,role,<AdminOrderList/>) 
        },
         {
          path:'admin/category/create',
          element:checkAdminAuth(isLoggedIn,role,<Categoryform/>) 
        },
          {
          path:'admin/product/create',
          element:checkAdminAuth(isLoggedIn,role,<AdminProductForm/>) 
         },
         {
          path:'admin/orders/:orderId',
          element:checkAdminAuth(isLoggedIn,role,<AdminOrderDetails/>)
        },
      ]
    }
  ]
}
const authRoutes = function(isLoggedIn,role,element){
    if (isLoggedIn && role ==0) {
        return element
    }else if(isLoggedIn && role !=0){
        return <Navigate to='/'/>
    }
    else{
        return <Login/>
    }
}
const checkAdminAuth = function(isLoggedIn,role,element){
  if (isLoggedIn && role ==1) {
      return element
  }
  else if (role != 1) {
     return <Navigate to='/'/>
  }else{
      return <Login/>
  }
}
function App() {
   const isLoggedIn = localStorage.getItem('token') ? true : false;
   const userInfo  = JSON.parse(localStorage.getItem('user')) || localStorage.getItem('user');
   const role = userInfo ? userInfo.role : 0
  const appRoutes = useRoutes(routes(isLoggedIn,role))
  return appRoutes
}
export default App
