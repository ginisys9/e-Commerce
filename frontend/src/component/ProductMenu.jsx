import {Link, useNavigate} from 'react-router-dom'
function ProductMenu() {
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const role = userInfo ? userInfo.role : 0 
  const logOut = function(){
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div>
     {role == 1 ? <ul className='list-group'>
        <li className='list-group-item'>
            <Link to='/admin/profile' className='text-dark'>Profile</Link>
        </li>
          <li className='list-group-item'>
            <Link to='/admin/categories' className='text-dark'>Categories</Link>
        </li>
         <li className='list-group-item'>
            <Link to='/admin/products' className='text-dark'>Products</Link>
        </li>
         <li className='list-group-item'>
            <Link to='/admin/orders' className='text-dark'>Orders</Link>
        </li>
    </ul> : <ul className='list-group'>
        <li className='list-group-item'>
            <Link to='/profile' className='text-dark' >Profile</Link>
        </li>
          <li className='list-group-item'>
            <Link to='/order' className='text-dark'>Order</Link>
        </li>
    </ul>}
    <button className='btn btn-dark btn-sm mt-3'
     onClick={logOut}
    >Logout</button>
    </div>
  )
}
export default ProductMenu