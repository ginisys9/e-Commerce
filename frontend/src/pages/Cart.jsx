import { useState,useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate,Link } from "react-router-dom"
function Cart() {
   const [cart, setCart] = useState([])
   const [total, setTotal] = useState(0)
   const navigate = useNavigate()
   const getCarts = async function(){
    try {
        const response = await fetch('http://localhost:3000/api/cart/getcart',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
     const data = await response.json()
      console.log(data);
      
     if (data.cart && data) {
      const {totalAmount} = data;
      const {products} = data.cart
      setCart(products)
      setTotal(totalAmount)
     }else{
       navigate('/product')
     }
    } catch (error) {
       toast.error("Something went wrong")
    }
   }
   useEffect(function(){
     getCarts()
   },[])
   const removeCart = async function(productId){
       try {
          const response = await fetch(`http://localhost:3000/api/cart/${productId}`,{
             method: 'Delete',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            const data = await response.json()
            toast.success("product deleted successfully")
            getCarts()
       } catch (error) {
          toast.error("Something went wrong")
       }
   }
  return (
    <div className='my-5'>
       <div className="container">
         <div className="text-center">
            <h1>Cart</h1>
         </div>
            <table className="table">
  <thead>
    <tr>
      <th scope="col">Sr No</th>
      <th scope="col">Product</th>
      <th scope="col">Quantity</th>
      <th scope="col">price</th>
      <th scope="col">Total Price</th>
    </tr>
  </thead>
  <tbody>
    {cart && cart.length > 0 && cart.map((item,id)=>(
      <tr key={id}>
        <th scope="row">{id+1}</th>
        <td>
          <img src={`http://localhost:3000${item.product.image}`} className="me-3" style={{width:"80px"}}/>
          {item.product.name}
          </td>
        <td>{item.quantity}</td>
        <td>{item.product.perPriceQuantity}</td>
        <td>{item.price}</td>
      </tr>
    ))}
    <tr>
      <td colSpan={5}>Total</td>
      <td>{total}</td>
    </tr>
  </tbody>
</table>
  <div>
     <Link to='/checkOut' className="btn 
     btn-dark d-block">checkOut</Link>
     </div>
       </div>
    </div>
  )
}

export default Cart