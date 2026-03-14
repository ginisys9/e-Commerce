import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import {useNavigate} from 'react-router-dom'
function CheckOut() {
    const [cart, setCart] = useState([])
    const [orderId, setOrder] = useState(null)
    const [total, setTotal] = useState(0)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        permanentAddress: "",
        temporaryAddress: "",
        city: "",
        state: "",
        pinCode: "",
        paymentType: "COD"
    })   
    const [error, setError] = useState({
              firstName: "",
              lastName: "",
              permanentAddress: "",
              temporaryAddress: "",
              city: "",
              state: "",
              pinCode: "",
              paymentType: ""
    })
    const navigate = useNavigate()
    const getCarts = async function () {
        try {
            const response = await fetch('http://localhost:3000/api/cart/getcart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json()
            if (data && data.cart) {
            const { products } = data.cart
            const { totalAmount } = data;
            setCart(products)
            setTotal(totalAmount)
            }else{
                navigate('/product')
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    useEffect(function () {
        getCarts()
    }, [])
    const handleChange = function (e) {
        setData(({ ...data, [e.target.name]: e.target.value}))
    }
    const validate = function (formData) {
         let  isValid = true;
          const error = {
              firstName: "",
              lastName: "",
              permanentAddress: "",
              temporaryAddress: "",
              city: "",
              state: "",
              pinCode: "",
              paymentType: ""
          };
          if (!formData.firstName) {
              isValid = false;
              error.firstName = "First Name is required"
          }
          if (!formData.lastName) {
              isValid = false;
              error.lastName = "Last Name is required"
          }
          if (!formData.city) {
              isValid = false;
              error.city = " City is required"
          }
          if (!formData.state) {
              isValid = false;
              error.state = "State is required"
          }
          if (!formData.pinCode) {
              isValid = false;
              error.pinCode = "Pin Code is required"
          }
          if (!formData.permanentAddress) {
              isValid = false;
              error.permanentAddress = "Permanent Address is required"
          }
          if (!formData.temporaryAddress) {
              isValid = false;
              error.temporaryAddress = "Temporary Address is required"
          }
           setError({...error})
          return isValid
    }

   const initialCheckOut = async function(data){
       if (validate(data)){
        try {
                const respose = await fetch(`http://localhost:3000/api/check`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify(data)
              })
              const resData = await respose.json()  
              setOrder(resData)
                toast.success("Order has been placed")
        } catch (error) {
            toast.error("Something went wrong")
        }
       }
   }
   const confirmCheckOut = async function(orderId){
       try {
          const respose = await fetch(`http://localhost:3000/api/check/${orderId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
              })
              toast.success("Order has been placed")
              getCarts()
              setData({
                firstName: "",
                lastName: "",
                permanentAddress: "",
                temporaryAddress: "",
                city: "",
                state: "",
                pinCode: "",
                paymentType: "COD"
          })
           navigate('/profile')
       } catch (error) {
        toast.error("Something went wrong")
       }
   }
   const actionCheckOut = function(){
    if (orderId) {
        confirmCheckOut(orderId)
    }
    else{
      initialCheckOut(data)
    }
   }
 return (
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h1>Checkout</h1>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form className="mx-auto row">
                            <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={data.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            {error.firstName && 
                             <div className="text-danger">
                                {error.firstName}
                             </div>
                            }
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastname" className="form-label">Last Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={data.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                               {error.lastName && 
                             <div className="text-danger">
                                {error.lastName}
                             </div>
                            }
                            <div className="col-md-12 mb-3">
                                <label htmlFor="permanentAddress" className="form-label">Permanent Address</label>
                                <input type="text"
                                    className="form-control"
                                    name="permanentAddress"
                                    value={data.permanentAddress}
                                    onChange={handleChange}
                                />
                            </div>
                               {error.permanentAddress && 
                             <div className="text-danger">
                                {error.permanentAddress}
                             </div>
                            }
                            <div className="col-md-12 mb-3">
                                <label htmlFor="temporaryAddress" className="form-label">temporary Address</label>
                                <input type="text"
                                    className="form-control"
                                    name="temporaryAddress"
                                    value={data.temporaryAddress}
                                    onChange={handleChange}
                                />
                            </div>
                               {error.temporaryAddress && 
                             <div className="text-danger">
                                {error.temporaryAddress}
                             </div>
                            }
                            <div className="col-md-3 mb-3">
                                <label htmlFor="city" className="form-label">city
                                </label>
                                <input type="text"
                                    className="form-control"
                                    name="city"
                                    value={data.city}
                                    onChange={handleChange}
                                />
                            </div>
                               {error.city && 
                             <div className="text-danger">
                                {error.city}
                             </div>
                            }
                            <div className="col-md-4 mb-3">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text"
                                    className="form-control"
                                    name="state"
                                    value={data.state}
                                    onChange={handleChange}
                                />
                            </div>
                               {error.state && 
                             <div className="text-danger">
                                {error.state}
                             </div>
                            }
                            <div className="col-md-4 mb-3">
                                <label htmlFor="pinCode" className="form-label">Zip</label>
                                <input type="number"
                                    className="form-control"
                                    name="pinCode"
                                    max={8}
                                    value={data.pinCode}
                                    onChange={handleChange}
                                />
                            </div>
                               {error.pinCode && 
                             <div className="text-danger">
                                {error.pinCode}
                             </div>
                            }
                        </form>
                    </div>
                    <div className="col-md-6">
                        <div className="text-center">
                            <h2>Products</h2>
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
                                {cart && cart.length > 0 && cart.map((item, id) => (
                                    <tr key={id}>
                                        <th scope="row">{id + 1}</th>
                                        <td>
                                            <img src={`http://localhost:3000${item.product.image}`} className="me-3" style={{ width: "80px" }} />
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
                     <div className="my-3">
                        <strong>Payment Type</strong>
                        <div className="form-check">
                            <input type="radio" name="payment" 
                            value={'COD'}
                            checked={data.paymentType === 'COD'}
                            className="form-check-input" />
                            <label htmlFor="payment" 
                            className="form-check-label">Cash On Delivery</label>
                        </div>
                     <div className="my-3">
                          <button type="submit" 
                           onClick={actionCheckOut}
                           className="btn btn-dark w-100">
                            {orderId ==null ? 'CheckOut' : 'Confirm Order'}
                          </button>
                     </div>
                     </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CheckOut