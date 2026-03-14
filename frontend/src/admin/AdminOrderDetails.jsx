import { useState } from "react"
import { Route, useParams } from "react-router-dom";
import ProductMenu from "../component/ProductMenu"
import { useEffect } from "react";
import { toast } from "react-toastify";
const statusItem = ["initiated",'pending',"Processing","completed","Cancelled"]
function AdminOrderDetails() {
  const [order, setOrder] = useState();
  const [status,setStatus] = useState('');
  const { orderId } = useParams(); 
  const getOderInfo = async function (orderId) {
    try {
      const respose = await fetch(`http://localhost:3000/api/order/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      const resData = await respose.json()
      setOrder(resData)      
      setStatus(resData.status)
    } catch (error) {
      console.log(error);
    }
  }
   const getStatusDetails = async function () {
      try {
         const obj = {
            status
         }
         const res = await fetch(`http://localhost:3000/api/order/${orderId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(obj)
          }
         )
         const data = await res.json()    
         console.log(data);
         toast.success('Status updated successfully')
      } catch (error) {
         console.log(error);
         toast.error('Something went wrong')
         
      }
   }
    const inputChangeHandler = function (e) {
      setStatus(e.target.value)
  }
  useEffect(function () {
    if (orderId) {
      getOderInfo(orderId)
    }
  }, [])
  return (
    <div className="my-5">
      <div className="container">
        <div className="text-center">
          <h1>Order Details</h1>
        </div>
        <div className="row">
          <div className="col-md-4">
            <ProductMenu />
          </div>
          <div className="col-md-8">
            <h3>Customer Details:</h3>
            <div>
              {order && <>
                <p>{order.firstName} {order.lastName}</p>
             <p>{order.temporaryAddress} {order.permanentAddress}</p>
              <p>{order.state} {order.city} {order.pinCode}</p>
              </>}
            </div>
            <hr />
              <h3>Products:</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sr No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {order && order.products.map(function (item, index) {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.product.name}</td>
                      <td>
                        <img src={`http://localhost:3000/${item.product.image}`} width="50" height="50" />
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <hr />
            <h4>Status:</h4>
            <div className="mb-3">
              <select 
              className="form-control mb-3"
               name="status"
               onChange={inputChangeHandler}
               value={status}
              >
            {statusItem.map(function(item,index){
              return <option key={index} value={item}>{item}</option>
            })}
              </select>
              <div className="mb-3">
                <button 
                 onClick={getStatusDetails}
                className="btn btn-dark float-end">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdminOrderDetails