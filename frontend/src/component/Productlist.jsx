import img from '../assets/img.jpg'
import { toast } from 'react-toastify';
function Productlist(props) {
      const {item} = props    
      const addToCart = async function(productId){
        try {
            const reqObj = {
                productId:productId,
                quantity:1
            }
            const res = await fetch('http://localhost:3000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(reqObj)
            })
           const data = await res.json();
           toast.success("Product added to cart")
           console.log(data);
        } catch (error) {
          toast.error("Something went wrong")
          alert('Something went wrong')
        }
      }
  return (
    <>
      <div className="card">
        <img src={`http://localhost:3000${item.image}`} className="card-img-top"/>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <p className="card-text">Rs {item.perPriceQuantity}</p>
          <button type='button' className="btn btn-primary" onClick={()=>addToCart(item._id)}>Add to cart</button>
        </div>
      </div>
    </>
  )
}
export default Productlist