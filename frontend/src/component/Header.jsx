import { Link } from "react-router-dom"
function Header() {
   const isLoggedIn = localStorage.getItem('token') ? true : false
   const userInfo  = JSON.parse(localStorage.getItem('user')) || localStorage.getItem('user');
   const role = userInfo ? userInfo.role : 0
  return (
    <div>
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand">Navbar</a>
  <Link className="navbar-brand" to="/product">Products</Link>
   <div className="ml-auto">
    <div className="navbar-nav">
      {isLoggedIn ? <>
       {role ==1 ? <>
            <li className="nav-item">
        <button className="btn btn-light text-dark mx-2">
          <Link to='admin/profile'>
           Profile
        </Link>
        </button>
      </li> 
       </> : <>
           <li className="nav-item">
          <Link to='/cart' className="text-light me-3">
         Cart
         </Link>
        <button className="btn btn-light text-dark mx-2">
          <Link to='/profile'>
           Profile
        </Link>
        </button>
      </li> 
       </>}
     
      </>
   :<>
         <li className="nav-item">
        <button className="btn btn-light mx-2">
          <Link to='/login'>
           Login
        </Link>
        </button>
         <button className="btn btn-light mx-1">
          <Link to='/register'>
           Register
        </Link>
        </button>
      </li>
      </>
      }
    </div>
  </div>
  </nav>
 
    </div>
  )
}

export default Header