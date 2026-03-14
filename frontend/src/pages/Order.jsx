import ProductMenu from "../component/ProductMenu"
import { useEffect, useState } from "react"
function Order(){
    const [order,setOrder] = useState([]);
    const getOrder = async function(){
        try {
            const respose = await fetch(`http://localhost:3000/api/order`, {
          method: 'GET',
          headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          })
          const resData = await respose.json()
          const {orders,pagination} = resData
          setOrder(orders)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }  
    useEffect(function(){
        getOrder()
    },[])
  return (
    <div className="my-5">
       <div className="container">
         <div className="text-center">
            <h1>Order</h1>
         </div>
         <div className="row">
          <div className="col-md-4">
            <ProductMenu/>
          </div>
           <div className="col-md-8">
            <table className="table">
  <thead>
    <tr>
      <th scope="col">Order Id</th>
      <th scope="col">Product</th>
      <th scope="col">Payement</th>
      <th scope="col">Status</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    {order && order.length > 0 && order.map((item,id)=>(
      <tr key={id}>
        <th scope="row">{item._id}</th>
        <td>
          {item.products && item.products.length > 0 && item.products.map((pr,idx)=>(
            <div key={idx}>
              <img src={`http://localhost:3000${pr.product.image}`} width={80} />
              <hr />
              <span>{pr.product.name}</span>
            </div>
          ))}   
        </td>
        <td>{item.paymentType}</td>
        <td>{item.status}</td>
        <td>{item.amount}</td>
      </tr>
    ))}
  </tbody>
</table>
       </div>
       </div>
       </div>
     </div>
  )
}

export default Order