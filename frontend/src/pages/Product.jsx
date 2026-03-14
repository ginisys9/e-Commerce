import { useState } from "react"
import Productlist from "../component/Productlist"
import { useEffect } from "react"
function Product() {

  const [product,setProducts] = useState([])
   const fetchData = async function(){
     const response = await fetch('http://localhost:3000/api/product')
     const data = await response.json()
     setProducts(data.products)
   }
   useEffect(function(){
     fetchData()
   },[])

  return (
    <div className="py-5">
       <div className="container">
         <div className="text-center">
            <h1>Product</h1>
         </div>
         <div className="product-listing">
            <div className="row">
             {product && product.length > 0 && product.map((item,id)=>(
               <div className="col-md-3 my-2" key={id}>
                 <Productlist 
                 item={item}/>
               </div>
             ))}
            </div>
         </div>
       </div>
    </div>
  )
}
export default Product

