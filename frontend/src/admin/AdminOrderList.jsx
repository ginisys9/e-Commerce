import { useEffect, useState } from "react"
import ProductMenu from "../component/ProductMenu"
import { Link } from "react-router-dom" 
function AdminOrderList() {
  const [allOrder, setAllOrder] = useState([]);
  const getAllOrder = async function(){
    const res = await fetch('http://localhost:3000/api/order', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await res.json()
    const { orders } = data
    setAllOrder(orders)

  }
  useEffect(() => {
    getAllOrder()
  }, [])
  return (
    <div className="my-5">
      <div className="container">
        <div className="text-center">
          <h1>Orders</h1>
        </div>
        <div className="row">
          <div className="col-md-4">
            <ProductMenu />
          </div>
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sr No</th>
                  <th scope="col">User</th>
                  <th scope="col">Products</th>
                  <th scope="col">Address</th>
                  <th scope="col">Status</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Total</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allOrder && allOrder.map((item, id) => (
                  <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>
                      <p>{item.user.name}</p>
                      <p>{item.user.email}</p>
                    </td>
                    <td>
                      {item.products.length > 0 && item.products.map((item, id) => (
                        <p key={id}>{item.product.name} | {item.quantity} | Rs {item.price}</p>
                      ))}
                    </td>
                    <td>
                      <p>{item.firstName} {item.lastName}</p>

                      <p>{item.temporaryAddress}, {item.permanentAddress}</p>

                      <p>{item.city}, {item.state}, {item.pincode}</p>
                    </td>
                    <td>{item.status}</td>
                    <td>{item.paymentType}</td>
                    <td>@mdo</td>
                    <td><Link to={`/admin/orders/${item._id}`} className="btn btn-dark">View</Link></td>
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
export default AdminOrderList